import { Event, Signer } from "ethers";
import { isEqual } from "lodash";
import {
  L1DAIWormholeGateway,
  Starknet,
  WormholeJoin,
} from "types/ethers-contracts";
import { l2_dai_wormhole_gateway } from "types/starknet-contracts/l2_dai_wormhole_gateway";

import {
  cairoShortStringToBytes32,
  Config,
  findNearestBlock,
  getConfig,
  getL1ContractAt,
  getL1Signer,
  getL2ContractAt,
  getL2Signer,
  l1String,
  l2String,
  toUint,
} from "./utils";

export async function flush(config: Config, targetDomain: string) {
  const l1Signer = getL1Signer(config);
  const l2Signer = getL2Signer(config);

  const l2WormholeGateway = await getL2ContractAt<l2_dai_wormhole_gateway>(
    l2Signer,
    "l2_dai_wormhole_gateway",
    config.l2WormholeGatewayAddress
  );

  const encodedTargetDomain = l2String(targetDomain);

  const lastFlushTimestamp = await recentFlushTimestamp(config, l1Signer);
  const [daiToFlushSplit] = await l2WormholeGateway.batched_dai_to_flush(
    encodedTargetDomain
  );
  const daiToFlush = toUint(daiToFlushSplit);
  console.log(`DAI to flush: ${daiToFlush}`);

  if (daiToFlush > config.flushMinimum && (Date.now() > lastFlushTimestamp + config.flushDelay)) {
    console.log("Sending `flush` transaction");
    const { transaction_hash } = await l2WormholeGateway.flush(
      encodedTargetDomain,
      { maxFee: "0" }
    );
    await l2Signer.waitForTransaction(transaction_hash);
    console.log("Success");
  }
}

export async function finalizeFlush(config: Config) {
  const l1Signer = getL1Signer(config);

  const l1WormholeGateway = await getL1ContractAt<L1DAIWormholeGateway>(
    l1Signer,
    "L1DAIWormholeGateway",
    config.l1WormholeGatewayAddress
  );
  const starknet = await getL1ContractAt<Starknet>(
    l1Signer,
    "Starknet",
    config.starknetAddress
  );

  const flushes = await flushesToBeFinalized(l1Signer, starknet, config);
  flushes.forEach(async (flush: Event) => {
    console.log("Sending `finalizeFlush` transaction");
    const tx = await l1WormholeGateway.finalizeFlush(
      cairoShortStringToBytes32(flush.args.payload[1]),
      flush.args.payload[2]
    );
    await tx.wait();
    console.log("Success");
  });
}

async function recentFlushTimestamp(
  { wormholeJoinAddress, sourceDomain }: Config,
  l1Signer: Signer
): Promise<number> {
  const wormholeJoin = await getL1ContractAt<WormholeJoin>(
    l1Signer,
    "WormholeJoin",
    wormholeJoinAddress
  );
  const settleFilter = wormholeJoin.filters.Settle(l1String(sourceDomain));
  const nearestBlock = await findNearestBlock(l1Signer.provider, Date.now());
  const settleEvents = await wormholeJoin.queryFilter(
    settleFilter,
    nearestBlock
  );
  const recentEvent = settleEvents[settleEvents.length - 1];
  const block = await recentEvent.getBlock();
  return block.timestamp;
}

async function flushesToBeFinalized(
  l1Signer: Signer,
  starknet: Starknet,
  config: ReturnType<typeof getConfig>
): Promise<Event[]> {
  async function getSettleMessageEvents(): Promise<Event[]> {
    const wormholeJoin = await getL1ContractAt<WormholeJoin>(
      l1Signer,
      "WormholeJoin",
      config.wormholeJoinAddress
    );
    const logMessageFilter = starknet.filters.LogMessageToL1(
      config.l2WormholeGatewayAddress,
      config.l1WormholeGatewayAddress
    );
    const settleFilter = wormholeJoin.filters.Settle();
    const nearestBlock = await findNearestBlock(l1Signer.provider, Date.now() - 10 * config.flushDelay);
    const settleEvents = await starknet.queryFilter(settleFilter, nearestBlock);
    return starknet.queryFilter(
      logMessageFilter,
      settleEvents[settleEvents.length - 1].blockNumber
    );
  }

  async function getConsumedSettleMessageEvents(
    event: Event
  ): Promise<Event[]> {
    const consumedMessageFilter = starknet.filters.ConsumedMessageToL1(
      config.l2WormholeGatewayAddress,
      config.l1WormholeGatewayAddress
    );
    return (
      await starknet.queryFilter(consumedMessageFilter, event.blockNumber)
    ).filter((consumedEvent) => {
      const eventArgs = event.args.map((_) => _.toString());
      const consumedEventArgs = consumedEvent.args.map((_) => _.toString());
      return isEqual(eventArgs, consumedEventArgs);
    });
  }

  const logMessageEvents = await getSettleMessageEvents();
  return Promise.all(
    logMessageEvents.map(async (event: Event) => {
      const consumedMessageEvents = await getConsumedSettleMessageEvents(event);
      if (consumedMessageEvents.length === 0) {
        return event;
      }
    })
  );
}

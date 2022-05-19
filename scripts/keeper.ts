import { Event, Signer } from "ethers";
import * as starknet from "starknet";
const { genKeyPair, getStarkKey } = starknet.ec;
import { isEqual } from "lodash";
import {
  L1DAIWormholeGateway,
  Starknet,
  WormholeJoin,
} from "types/ethers-contracts";
import { l2_dai_wormhole_gateway } from "types/starknet-contracts/l2_dai_wormhole_gateway";

import {
  cairoShortStringToBytes32,
  getL1ContractAt,
  getL1Signer,
  getL2ContractAt,
  getL2Signer,
  getRequiredEnv,
  l1String,
  l2String,
  toUint,
} from "./utils";

const ENV = getRequiredEnv("NODE_ENV").toUpperCase();
const NETWORK = getRequiredEnv("NETWORK").toUpperCase();
const START_BLOCK = parseInt(getRequiredEnv(`${NETWORK}_START_BLOCK`));

const SOURCE_DOMAIN = `${NETWORK}-SLAVE-STARKNET-1`;
const FLUSH_DELAY = parseInt(getRequiredEnv("FLUSH_DELAY"));

async function flush(targetDomain: string) {
  const l1Signer = getL1Signer(NETWORK, ENV);
  const l2Signer = getL2Signer(NETWORK, ENV);

  const l1WormholeGatewayAddress = getRequiredEnv(
    `${NETWORK}_L1_DAI_WORMHOLE_GATEWAY_ADDRESS`
  );
  const l1WormholeGateway = await getL1ContractAt<L1DAIWormholeGateway>(
    l1Signer,
    "L1DAIWormholeGateway",
    l1WormholeGatewayAddress
  );

  const l2WormholeGatewayAddress = getRequiredEnv(
    `${NETWORK}_L2_DAI_WORMHOLE_GATEWAY_ADDRESS`
  );
  const l2WormholeGateway = await getL2ContractAt<l2_dai_wormhole_gateway>(
    l2Signer,
    "l2_dai_wormhole_gateway",
    l2WormholeGatewayAddress
  );

  const encodedDomain = l2String(targetDomain);
  async function recentFlushTimestamp(): Promise<number> {
    const wormholeJoinAddress = getRequiredEnv(
      `${NETWORK}_WORMHOLE_JOIN_ADDRESS`
    );
    const wormholeJoin = await getL1ContractAt<WormholeJoin>(
      l1Signer,
      "WormholeJoin",
      wormholeJoinAddress
    );
    const settleFilter = wormholeJoin.filters.Settle(l1String(SOURCE_DOMAIN));
    const settleEvents = await wormholeJoin.queryFilter(settleFilter, START_BLOCK);
    const recentEvent = settleEvents[settleEvents.length - 1];
    const block = await recentEvent.getBlock();
    return block.timestamp;
  }
  const lastFlushTimestamp = await recentFlushTimestamp();
  const [daiToFlushSplit] = await l2WormholeGateway.batched_dai_to_flush(
    encodedDomain
  );
  const daiToFlush = toUint(daiToFlushSplit);
  console.log(`DAI to flush: ${daiToFlush}`);

  if (daiToFlush > 0 && (Date.now() > lastFlushTimestamp + FLUSH_DELAY)) {
    console.log("Sending `flush` transaction");
    const { transaction_hash } = await l2WormholeGateway.flush(encodedDomain, { maxFee: "0" });
    await l2Signer.waitForTransaction(transaction_hash);
    console.log("Success");
  }
}

async function finalizeFlush(targetDomain: string) {
  const l1Signer = getL1Signer(NETWORK, ENV);
  const l2Signer = getL2Signer(NETWORK, ENV);

  const l1WormholeGatewayAddress = getRequiredEnv(
    `${NETWORK}_L1_DAI_WORMHOLE_GATEWAY_ADDRESS`
  );
  const l2WormholeGatewayAddress = getRequiredEnv(
    `${NETWORK}_L2_DAI_WORMHOLE_GATEWAY_ADDRESS`
  );
  const starknetAddress = getRequiredEnv(`${NETWORK}_STARKNET_ADDRESS`);
  const l1WormholeGateway = await getL1ContractAt<L1DAIWormholeGateway>(
    l1Signer,
    "L1DAIWormholeGateway",
    l1WormholeGatewayAddress
  );
  const l2WormholeGateway = await getL2ContractAt<l2_dai_wormhole_gateway>(
    l2Signer,
    "l2_dai_wormhole_gateway",
    l2WormholeGatewayAddress
  );

  const starknet = await getL1ContractAt<Starknet>(
    l1Signer,
    "Starknet",
    starknetAddress
  );
    
  const flushes = await flushesToBeFinalized(
    l1Signer,
    l1WormholeGatewayAddress,
    l2WormholeGatewayAddress,
    starknet
  );
  flushes.forEach(async (flush: Event) => {
    console.log("Sending `finalizeFlush` transaction");
    const tx = await l1WormholeGateway.finalizeFlush(
      cairoShortStringToBytes32(flush.args.payload[1]),
      flush.args.payload[2]
    );
    const res = await tx.wait();
    console.log("Success");
  });
}

async function flushesToBeFinalized(
  l1Signer: Signer,
  l1WormholeGatewayAddress: string,
  l2WormholeGatewayAddress: string,
  starknet: Starknet
): Promise<Event[]> {
  async function getSettleMessageEvents(): Promise<Event[]> {
    const wormholeJoinAddress = getRequiredEnv(
      `${NETWORK}_WORMHOLE_JOIN_ADDRESS`
    );
    const wormholeJoin = await getL1ContractAt<WormholeJoin>(
      l1Signer,
      "WormholeJoin",
      wormholeJoinAddress
    );
    const logMessageFilter = starknet.filters.LogMessageToL1(
      l2WormholeGatewayAddress,
      l1WormholeGatewayAddress
    );
    const settleFilter = wormholeJoin.filters.Settle();
    const settleEvents = await starknet.queryFilter(settleFilter, START_BLOCK);
    return starknet.queryFilter(
      logMessageFilter,
      settleEvents[settleEvents.length - 1].blockNumber
    );
  }

  async function getConsumedSettleMessageEvents(event: Event): Promise<Event[]> {
    const consumedMessageFilter = starknet.filters.ConsumedMessageToL1(
      l2WormholeGatewayAddress,
      l1WormholeGatewayAddress
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

if (process.argv[2] === "flush") {
  flush(process.argv[3]);
} else if (process.argv[2] === "finalizeFlush") {
  finalizeFlush(process.argv[3]);
}

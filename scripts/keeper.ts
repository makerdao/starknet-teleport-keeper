import { BigNumber, Signer } from "ethers";
import { isEqual } from "lodash";
import {
  L1DAITeleportGateway,
  Starknet,
} from "types/ethers-contracts";
import type {
  ConsumedMessageToL1Event,
  LogMessageToL1Event,
} from "types/ethers-contracts/Starknet";
import { l2_dai_teleport_gateway } from "types/starknet-contracts";

import {
  cairoShortStringToBytes32,
  Config,
  getConfig,
  getL1ContractAt,
  getL1Signer,
  getL2ContractAt,
  getL2Signer,
  getL1TeleportGatewayAddress,
  toUint,
} from "./utils";

const HANDLE_FLUSH = BigNumber.from(1);
const FINALIZE_FLUSH = BigNumber.from(1);

async function recentFlushTimestamps(
  l2TeleportGateway: l2_dai_teleport_gateway,
  l1Signer: Signer,
  { flushDelay, flushDelayMultiplier, starknetAddress }: Config
): Promise<{ timestamp: number, targetDomain: string }[]> {
  const l1TeleportGatewayAddress = `0x${(await l2TeleportGateway.teleport_gateway())[0].toString(16)}`;
  const starknet = await getL1ContractAt<Starknet>(
    l1Signer,
    "Starknet",
    starknetAddress
  );
  const logMessageFilter = starknet.filters.LogMessageToL1(
    l2TeleportGateway.address,
    l1TeleportGatewayAddress
  );
  const logMessageEvents = await starknet.queryFilter(
    logMessageFilter,
    Date.now() - flushDelayMultiplier * flushDelay
  );
  const flushEvents = logMessageEvents.filter(event => {
    return event.args[0] === FINALIZE_FLUSH;
  });
  return Promise.all(flushEvents.map(async (event) => {
    return {
      timestamp: (await event.getBlock()).timestamp,
      targetDomain: cairoShortStringToBytes32(BigNumber.from(event.args[1]))
    }
  }));
}

export async function flush(config: Config) {
  const l1Signer = getL1Signer(config);
  const l2Signer = getL2Signer(config);

  const l2TeleportGateway = await getL2ContractAt<l2_dai_teleport_gateway>(
    l2Signer,
    "l2_dai_teleport_gateway",
    config.l2TeleportGatewayAddress
  );

  const lastFlushTimestamps = await recentFlushTimestamps(l2TeleportGateway, l1Signer, config);
  lastFlushTimestamps.forEach(async ({ timestamp, targetDomain }) => {
    const [daiToFlushSplit] = await l2TeleportGateway.batched_dai_to_flush(
      targetDomain
    );
    const daiToFlush = toUint(daiToFlushSplit);
    console.log(`DAI to flush: ${daiToFlush}`);

    if (
      daiToFlush > config.flushMinimum &&
      Date.now() > timestamp + config.flushDelay
    ) {
      console.log("Sending `flush` transaction");
      const { amount } = await l2TeleportGateway.estimateFee.flush([
        targetDomain 
      ]);
      const { transaction_hash } = await l2TeleportGateway.flush(
        targetDomain,
        { maxFee: amount * config.l2GasMultiplier }
      );
      await l2Signer.waitForTransaction(transaction_hash);
      console.log("Success");
    } else {
      console.log("Flush not needed");
    }
  });
}

async function flushesToBeFinalized(
  l1TeleportGatewayAddress: string,
  starknet: Starknet,
  l1Signer: Signer,
  { flushDelay, flushDelayMultiplier, l2TeleportGatewayAddress }: ReturnType<typeof getConfig>
): Promise<LogMessageToL1Event[]> {
  async function getLogMessageEvents(): Promise<LogMessageToL1Event[]> {
    const logMessageFilter = starknet.filters.LogMessageToL1(
      l2TeleportGatewayAddress,
      l1TeleportGatewayAddress
    );
    return (
      await starknet.queryFilter(
        logMessageFilter,
        Date.now() - flushDelayMultiplier * flushDelay
      )
    ).filter((logEvent) => {
      return logEvent.args[0] === HANDLE_FLUSH;
    });;
  }

  async function getConsumedSettleMessageEvents(
    event: LogMessageToL1Event
  ): Promise<ConsumedMessageToL1Event[]> {
    const consumedMessageFilter = starknet.filters.ConsumedMessageToL1(
      l2TeleportGatewayAddress,
      l1TeleportGatewayAddress
    );
    return (
      await starknet.queryFilter(consumedMessageFilter, event.blockNumber)
    ).filter((consumedEvent) => {
      const eventArgs = event.args.map((_) => _.toString());
      const consumedEventArgs = consumedEvent.args.map((_) => _.toString());
      return isEqual(eventArgs, consumedEventArgs);
    });
  }

  const logMessageEvents = await getLogMessageEvents();
  return Promise.all(
    logMessageEvents.filter(async (event: LogMessageToL1Event) => {
      const consumedMessageEvents = await getConsumedSettleMessageEvents(event);
      return consumedMessageEvents.length === 0;
    })
  );
}

export async function finalizeFlush(config: Config) {
  const l1Signer = getL1Signer(config);
  const l2Signer = getL2Signer(config);

  const starknet = await getL1ContractAt<Starknet>(
    l1Signer,
    "Starknet",
    config.starknetAddress
  );
  const l2TeleportGateway = await getL2ContractAt<l2_dai_teleport_gateway>(
    l2Signer,
    "l2_dai_teleport_gateway",
    config.l2TeleportGatewayAddress
  );
  const l1TeleportGatewayAddress = await getL1TeleportGatewayAddress(l2TeleportGateway);
  const l1TeleportGateway = await getL1ContractAt<L1DAITeleportGateway>(
    l1Signer,
    "L1DAITeleportGateway",
    l1TeleportGatewayAddress
  );

  const flushes = await flushesToBeFinalized(l1TeleportGatewayAddress, starknet, l1Signer, config);
  for (let i = 1; i < flushes.length; i++) {
    const flush = flushes[i];
    console.log("Sending `finalizeFlush` transaction");
    const tx = await l1TeleportGateway.finalizeFlush(
      cairoShortStringToBytes32(flush.args.payload[1]),
      flush.args.payload[2]
    );
    await tx.wait();
    console.log("Success");
  }
}

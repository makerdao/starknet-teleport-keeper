import { Event, Signer } from "ethers";
import * as starknet from "starknet";
const { genKeyPair, getStarkKey } = starknet.ec;
import { isEqual } from "lodash";
import {
  L1DAITeleportGateway,
  Starknet,
  TeleportJoin,
} from "types/ethers-contracts";
import { l2_dai_teleport_gateway } from "types/starknet-contracts/l2_dai_teleport_gateway";

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

  const l1TeleportGatewayAddress = getRequiredEnv(
    `${NETWORK}_L1_DAI_WORMHOLE_GATEWAY_ADDRESS`
  );
  const l1TeleportGateway = await getL1ContractAt<L1DAITeleportGateway>(
    l1Signer,
    "L1DAITeleportGateway",
    l1TeleportGatewayAddress
  );

  const l2TeleportGatewayAddress = getRequiredEnv(
    `${NETWORK}_L2_DAI_WORMHOLE_GATEWAY_ADDRESS`
  );
  const l2TeleportGateway = await getL2ContractAt<l2_dai_teleport_gateway>(
    l2Signer,
    "l2_dai_teleport_gateway",
    l2TeleportGatewayAddress
  );

  const encodedDomain = l2String(targetDomain);
  async function recentFlushTimestamp(): Promise<number> {
    const teleportJoinAddress = getRequiredEnv(
      `${NETWORK}_WORMHOLE_JOIN_ADDRESS`
    );
    const teleportJoin = await getL1ContractAt<TeleportJoin>(
      l1Signer,
      "TeleportJoin",
      teleportJoinAddress
    );
    const settleFilter = teleportJoin.filters.Settle(l1String(SOURCE_DOMAIN));
    const settleEvents = await teleportJoin.queryFilter(settleFilter, START_BLOCK);
    const recentEvent = settleEvents[settleEvents.length - 1];
    const block = await recentEvent.getBlock();
    return block.timestamp;
  }
  const lastFlushTimestamp = await recentFlushTimestamp();
  const [daiToFlushSplit] = await l2TeleportGateway.batched_dai_to_flush(
    encodedDomain
  );
  const daiToFlush = toUint(daiToFlushSplit);
  console.log(`DAI to flush: ${daiToFlush}`);

  if (daiToFlush > 0 && (Date.now() > lastFlushTimestamp + FLUSH_DELAY)) {
    console.log("Sending `flush` transaction");
    const { transaction_hash } = await l2TeleportGateway.flush(encodedDomain, { maxFee: "0" });
    await l2Signer.waitForTransaction(transaction_hash);
    console.log("Success");
  }
}

async function finalizeFlush(targetDomain: string) {
  const l1Signer = getL1Signer(NETWORK, ENV);
  const l2Signer = getL2Signer(NETWORK, ENV);

  const l1TeleportGatewayAddress = getRequiredEnv(
    `${NETWORK}_L1_DAI_WORMHOLE_GATEWAY_ADDRESS`
  );
  const l2TeleportGatewayAddress = getRequiredEnv(
    `${NETWORK}_L2_DAI_WORMHOLE_GATEWAY_ADDRESS`
  );
  const starknetAddress = getRequiredEnv(`${NETWORK}_STARKNET_ADDRESS`);
  const l1TeleportGateway = await getL1ContractAt<L1DAITeleportGateway>(
    l1Signer,
    "L1DAITeleportGateway",
    l1TeleportGatewayAddress
  );
  const l2TeleportGateway = await getL2ContractAt<l2_dai_teleport_gateway>(
    l2Signer,
    "l2_dai_teleport_gateway",
    l2TeleportGatewayAddress
  );

  const starknet = await getL1ContractAt<Starknet>(
    l1Signer,
    "Starknet",
    starknetAddress
  );
    
  const flushes = await flushesToBeFinalized(
    l1Signer,
    l1TeleportGatewayAddress,
    l2TeleportGatewayAddress,
    starknet
  );
  flushes.forEach(async (flush: Event) => {
    console.log("Sending `finalizeFlush` transaction");
    const tx = await l1TeleportGateway.finalizeFlush(
      cairoShortStringToBytes32(flush.args.payload[1]),
      flush.args.payload[2]
    );
    const res = await tx.wait();
    console.log("Success");
  });
}

async function flushesToBeFinalized(
  l1Signer: Signer,
  l1TeleportGatewayAddress: string,
  l2TeleportGatewayAddress: string,
  starknet: Starknet
): Promise<Event[]> {
  async function getSettleMessageEvents(): Promise<Event[]> {
    const teleportJoinAddress = getRequiredEnv(
      `${NETWORK}_WORMHOLE_JOIN_ADDRESS`
    );
    const teleportJoin = await getL1ContractAt<TeleportJoin>(
      l1Signer,
      "TeleportJoin",
      teleportJoinAddress
    );
    const logMessageFilter = starknet.filters.LogMessageToL1(
      l2TeleportGatewayAddress,
      l1TeleportGatewayAddress
    );
    const settleFilter = teleportJoin.filters.Settle();
    const settleEvents = await starknet.queryFilter(settleFilter, START_BLOCK);
    return starknet.queryFilter(
      logMessageFilter,
      settleEvents[settleEvents.length - 1].blockNumber
    );
  }

  async function getConsumedSettleMessageEvents(event: Event): Promise<Event[]> {
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

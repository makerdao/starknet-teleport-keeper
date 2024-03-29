import { BigNumber, Signer } from "ethers";
import { isEqual } from "lodash";
import { L1DAITeleportGateway, Starknet } from "types/ethers-contracts";
import type {
  ConsumedMessageToL1Event,
  LogMessageToL1Event,
} from "types/ethers-contracts/Starknet";
import { l2_dai_teleport_gateway } from "types/starknet-contracts";

import {
  cairoShortStringToBytes32,
  Config,
  findNearestBlock,
  getConfig,
  getL1ContractAt,
  getL1Signer,
  getL1TeleportGatewayAddress,
  getL2ContractAt,
  getL2Signer,
  l2String,
  shortStringFeltToStr,
  toUint,
} from "./utils";

const HANDLE_FLUSH = BigNumber.from(1);
const FINALIZE_FLUSH = BigNumber.from(1);

async function getFlushedDomains(
  l2TeleportGateway: l2_dai_teleport_gateway,
  l1Signer: Signer,
  { flushDelay, starknetAddress, targetDomains }: Config
): Promise<string[]> {
  const l1TeleportGatewayAddress = await getL1TeleportGatewayAddress(
    l2TeleportGateway
  );
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
    await findNearestBlock(l1Signer.provider, Date.now() - flushDelay)
  );
  // console.log(logMessageEvents.map((a) => a.args[0]));
  const flushEvents = logMessageEvents.filter((event) => {
    return event.args.payload[0].eq(FINALIZE_FLUSH);
  });

  // eventually get targetDomains from File events
  const flushedDomains = [];

  flushEvents.forEach(async (event) => {
    const targetDomain = cairoShortStringToBytes32(
      BigNumber.from(event.args[1])
    );
    flushedDomains.push(targetDomain);
  });
  return flushedDomains;
}

export async function flush(config: Config) {
  const l1Signer = getL1Signer(config);
  const l2Signer = getL2Signer(config);
  // console.log(l2Signer);

  const l2TeleportGateway = await getL2ContractAt<l2_dai_teleport_gateway>(
    l2Signer,
    "l2_dai_teleport_gateway",
    config.l2TeleportGatewayAddress
  );

  const flushedDomains = await getFlushedDomains(
    l2TeleportGateway,
    l1Signer,
    config
  );
  config.targetDomains.forEach(async (targetDomain: string) => {
    // console.log(await l2TeleportGateway.batched_dai_to_flush(targetDomain));
    const [daiToFlushSplit] = await l2TeleportGateway.batched_dai_to_flush(
      l2String(targetDomain)
    );

    const daiToFlush = toUint(daiToFlushSplit);
    console.log(`DAI to flush: ${daiToFlush}`);

    const sendFlush = async () => {
      console.log(
        `Sending \`flush\` transaction - Domain: ${targetDomain} Amount: ${daiToFlush}`
      );
      const { gas_consumed } = await l2TeleportGateway.estimateFee.flush(
        l2String(targetDomain)
      );
      const { transaction_hash } = await l2TeleportGateway.flush(
        l2String(targetDomain),
        {
          maxFee: gas_consumed.toNumber() * config.l2GasMultiplier,
        }
      );
      console.log(transaction_hash);
      await l2Signer.waitForTransaction(transaction_hash);
      console.log("Success");
    };

    if (daiToFlush > config.flushMinimum) {
      await sendFlush();
    } else if (daiToFlush > 0 && !flushedDomains.includes(targetDomain)) {
      await sendFlush();
    } else {
      console.log("Flush not needed");
    }
  });
}

async function flushesToBeFinalized(
  l1TeleportGatewayAddress: string,
  starknet: Starknet,
  l1Signer: Signer,
  {
    flushDelay,
    flushDelayMultiplier,
    l2TeleportGatewayAddress,
  }: ReturnType<typeof getConfig>
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
      return logEvent.args.payload[0].eq(HANDLE_FLUSH);
    });
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
  // console.log(logMessageEvents);
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
  const l1TeleportGatewayAddress = await getL1TeleportGatewayAddress(
    l2TeleportGateway
  );
  const l1TeleportGateway = await getL1ContractAt<L1DAITeleportGateway>(
    l1Signer,
    "L1DAITeleportGateway",
    l1TeleportGatewayAddress
  );

  const flushes = await flushesToBeFinalized(
    l1TeleportGatewayAddress,
    starknet,
    l1Signer,
    config
  );
  // console.log(flushes.length);
  for (let i = 0; i < flushes.length; i++) {
    const flush = flushes[i];
    const targetDomain = cairoShortStringToBytes32(flush.args.payload[1]);
    console.log(
      `Sending \`finalize flush\` transaction - Domain: ${shortStringFeltToStr(
        flush.args.payload[1].toBigInt()
      )} Amount: ${flush.args.payload[2]}`
    );
    try {
      const tx = await l1TeleportGateway.finalizeFlush(
        targetDomain,
        flush.args.payload[2]
      );
      await tx.wait();
      console.log("Success");
    } catch (error) {
      console.log("Failed w/ error : ", error.body);
    }
  }
}

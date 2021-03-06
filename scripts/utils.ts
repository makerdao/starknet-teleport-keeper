import * as dotenv from "dotenv";
import dotenvExpand from "dotenv-expand";
import { BigNumber, Contract, ContractFactory, ethers, Signer } from "ethers";
import fs from "fs";
import path from "path";
import * as starknet from "starknet";
import { assert } from "ts-essentials";
import { l2_dai_teleport_gateway } from "types/starknet-contracts";

export function toUint(splitUint: object): bigint {
  const _a = Object.values(splitUint);
  return BigInt(`0x${_a[1].toString(16)}${_a[0].toString(16)}`);
}

export function l1String(str: string): string {
  return ethers.utils.formatBytes32String(str);
}

export function l2String(str: string): string {
  return `0x${Buffer.from(str, "utf8").toString("hex").padStart(64, "0")}`;
}

export function cairoShortStringToBytes32(l2String: BigNumber): string {
  return `0x${l2String.toBigInt().toString(16).padEnd(64, "0")}`;
}

export function getRequiredEnv(key: string): string {
  const value = process.env[key];
  assert(value, `Please provide ${key} in .env file`);

  return value;
}

export function getConfig() {
  const localEnv = dotenv.config({
    path: path.resolve(process.cwd(), ".env.local"),
  });
  dotenvExpand.expand(localEnv);
  if (process.env.NODE_ENV === "dev") {
    const forkEnv = dotenv.config({
      path: path.resolve(process.cwd(), ".env.fork"),
    });
    dotenvExpand.expand(forkEnv);
  }
  const env = dotenv.config({ path: path.resolve(process.cwd(), ".env") });
  dotenvExpand.expand(env);

  const network = getRequiredEnv("NETWORK").replace("-", "_").toUpperCase();
  return {
    network,
    flushDelay: parseInt(getRequiredEnv("FLUSH_DELAY")),
    flushDelayMultiplier: parseInt(getRequiredEnv("FLUSH_DELAY_MULTIPLIER")),
    flushMinimum: parseInt(getRequiredEnv("FLUSH_MINIMUM")),
    ethereumProviderUrl: getRequiredEnv(`${network}_ETHEREUM_PROVIDER_URL`),
    starknetProviderUrl: getRequiredEnv(`${network}_STARKNET_PROVIDER_URL`),
    l2TeleportGatewayAddress: getRequiredEnv(
      `${network}_L2_DAI_TELEPORT_GATEWAY_ADDRESS`
    ),
    starknetAddress: getRequiredEnv(`${network}_STARKNET_ADDRESS`),
    l1PrivateKey: getRequiredEnv(`${network}_L1_PRIVATE_KEY`),
    l2AccountAddress: getRequiredEnv(`${network}_L2_ACCOUNT_ADDRESS`),
    l2PrivateKey: getRequiredEnv(`${network}_L2_PRIVATE_KEY`),
    l2GasMultiplier: parseInt(getRequiredEnv("L2_GAS_MULTIPLIER")),
    targetDomains: getRequiredEnv(`${network}_TARGET_DOMAINS`).split(",")
  };
}

export type Config = ReturnType<typeof getConfig>;

export function getL1Signer({
  ethereumProviderUrl,
  l1PrivateKey,
}: Config): Signer {
  const provider = ethers.getDefaultProvider(ethereumProviderUrl);
  return new ethers.Wallet(l1PrivateKey, provider);
}

export function getL2Signer({
  starknetProviderUrl,
  l2AccountAddress,
  l2PrivateKey,
}: Config): starknet.Account {
  const provider = new starknet.Provider({
    baseUrl: starknetProviderUrl,
    feederGatewayUrl: "feeder_gateway",
    gatewayUrl: "gateway",
  });
  const starkKeyPair = starknet.ec.getKeyPair(l2PrivateKey);
  const starkKeyPub = starknet.ec.getStarkKey(starkKeyPair);
  const compiledArgentAccount = JSON.parse(
    fs.readFileSync("./abis/l2/ArgentAccount.json").toString("ascii")
  );
  return new starknet.Account(provider, l2AccountAddress, starkKeyPair);
}

export async function getL1ContractAt<C extends Contract>(
  signer: any,
  name: string,
  address: string
): Promise<C> {
  const compiledContract = JSON.parse(
    fs.readFileSync(`./abis/l1/${name}.json`).toString("ascii")
  );
  const contractFactory = new ContractFactory(
    compiledContract.abi,
    compiledContract.bytecode,
    signer
  );
  return contractFactory.attach(address) as C;
}

export async function getL2ContractAt<C extends starknet.Contract>(
  signer: any,
  name: string,
  address: string
): Promise<C> {
  const compiledContract = JSON.parse(
    fs.readFileSync(`./abis/l2/${name}.json`).toString("ascii")
  );
  const contractFactory = new starknet.ContractFactory(
    compiledContract,
    signer
  );
  return contractFactory.attach(address) as C;
}

export async function findNearestBlock(
  provider: ethers.providers.Provider,
  desiredTimestamp: number
): Promise<number> {
  let currentBlockNumber = (await provider.getBlock("latest")).number;
  let currentBlock = await provider.getBlock(currentBlockNumber);

  while (currentBlockNumber > 0 && currentBlock.timestamp > desiredTimestamp) {
    currentBlockNumber -= 30000;
    currentBlock = await provider.getBlock(currentBlockNumber);
  }

  return currentBlock.number;
}

export async function getL1TeleportGatewayAddress(l2TeleportGateway: l2_dai_teleport_gateway): Promise<string> {
  return `0x${(await l2TeleportGateway.teleport_gateway())[0].toString(16)}`;
}

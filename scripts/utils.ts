import * as dotenv from "dotenv";
import dotenvExpand from "dotenv-expand";
import { BigNumber, Contract, ContractFactory, ethers, Signer } from "ethers";
import fs from "fs";
import * as starknet from "starknet";
import { assert } from "ts-essentials";
const env = dotenv.config();
dotenvExpand.expand(env);

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

function getProviderUrls(network: string, env: string): {
  ethereum: string;
  starknet: string;
} {
  if (network === "LOCALHOST" || env === "DEV") {
    return {
      ethereum: "http://localhost:8545",
      starknet: "http://localhost:5000",
    };
  } else if (network === "MAINNET") {
    return {
      ethereum: getRequiredEnv("ALPHA_MAINNET_ETHEREUM_PROVIDER_URL"),
      starknet: getRequiredEnv("ALPHA_MAINNET_STARKNET_PROVIDER_URL"),
    };
  } else if (network === "GOERLI") {
    return {
      ethereum: getRequiredEnv("ALPHA_GOERLI_ETHEREUM_PROVIDER_URL"),
      starknet: getRequiredEnv("ALPHA_GOERLI_STARKNET_PROVIDER_URL"),
    };
  }
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

export function getL1Signer(network: string, env: string): Signer {
  const { ethereum: providerUrl } = getProviderUrls(network, env);
  const provider = ethers.getDefaultProvider(providerUrl);
  const privateKey = getRequiredEnv(`${network}_L1_PRIVATE_KEY`);
  return new ethers.Wallet(privateKey, provider);
}

export function getL2Signer(network: string, env: string): starknet.Account {
  const { starknet: providerUrl } = getProviderUrls(network, env);
  const provider = new starknet.Provider({
    baseUrl: providerUrl,
    feederGatewayUrl: "feeder_gateway",
    gatewayUrl: "gateway",
  });
  const address = getRequiredEnv(`${network}_L2_ACCOUNT_ADDRESS`);
  const l2PrivateKey = getRequiredEnv(`${network}_L2_PRIVATE_KEY`);
  const starkKeyPair = starknet.ec.getKeyPair(l2PrivateKey);
  const starkKeyPub = starknet.ec.getStarkKey(starkKeyPair);
  const compiledArgentAccount = JSON.parse(
    fs.readFileSync("./abis/l2/ArgentAccount.json").toString("ascii")
  );
  return new starknet.Account(provider, address, starkKeyPair);
}

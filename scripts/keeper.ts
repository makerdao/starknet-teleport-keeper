import { ethers, Signer } from "ethers";
import fs from "fs";
import * as starknet from "starknet";
import { assert } from "ts-essentials";
const { genKeyPair, getStarkKey } = starknet.ec;
import * as dotenv from "dotenv";
import { L1DAIWormholeGateway } from "types/ethers-contracts";
import { l2_dai_wormhole_gateway } from "types/starknet-contracts/l2_dai_wormhole_gateway";
dotenv.config();

const NETWORK = getRequiredEnv("NETWORK").toUpperCase();
const ENV = getRequiredEnv("NODE_ENV").toUpperCase();

const SOURCE_DOMAIN = `${NETWORK}-SLAVE-STARKNET-1`;
const FLUSH_DELAY = 100;

function toUint(splitUint: object): bigint {
  const _a = Object.values(splitUint);
  return BigInt(`0x${_a[1].toString(16)}${_a[0].toString(16)}`);
}

function l1String(str: string): string {
  return ethers.utils.formatBytes32String(str);
}

function l2String(str: string): string {
  return `0x${Buffer.from(str, "utf8").toString("hex").padStart(64, "0")}`;
}

function toL1String(hex: string): string {
  return `0x${BigInt(hex).toString(16).padEnd(64, "0")}`;
}

export function getRequiredEnv(key: string): string {
  const value = process.env[key];
  assert(value, `Please provide ${key} in .env file`);

  return value;
}

export async function getL1ContractAt(signer: any, name: string, address: string) {
  const compiledContract = JSON.parse(
    fs.readFileSync(`./abis/l1/${name}.json`).toString("ascii")
  );
  const contractFactory = new ethers.ContractFactory(compiledContract.abi, compiledContract.bytecode, signer);
  return contractFactory.attach(address);
}

export async function getL2ContractAt(signer: any, name: string, address: string) {
  const compiledContract = JSON.parse(
    fs.readFileSync(`./abis/l2/${name}.json`).toString("ascii")
  );
  const contractFactory = new starknet.ContractFactory(compiledContract, signer);
  return contractFactory.attach(address);
}

function getL1Signer(network: string): Signer {
  let baseUrl;
  const infuraApiKey = getRequiredEnv("INFURA_API_KEY");
  if (network === "LOCALHOST" || ENV === "DEV") {
    baseUrl = "http://localhost:8545";
  } else if (network === "MAINNET") {
    baseUrl =  `https://mainnet.infura.io/v3/${infuraApiKey}`;
  } else if (network === "GOERLI") {
    baseUrl =  `https://goerli.infura.io/v3/${infuraApiKey}`;
  }
  const provider = ethers.getDefaultProvider(baseUrl);
  const mnemonic = getRequiredEnv("MNEMONIC");
  return ethers.Wallet.fromMnemonic(mnemonic).connect(provider);
}

function getL2Signer(network: string): starknet.Account {
  let baseUrl;
  if (network === "LOCALHOST" || ENV === "DEV") {
    baseUrl = "http://localhost:5000";
  } else if (network === "MAINNET") {
    baseUrl = "https://alpha-mainnet.starknet.io";
  } else if (network === "GOERLI") {
    baseUrl = "https://alpha4.starknet.io";
  }
  const provider = new starknet.Provider({
      baseUrl,
      feederGatewayUrl: 'feeder_gateway',
      gatewayUrl: 'gateway',
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

async function deployAccount(network: string) {
  let baseUrl;
  if (network === "LOCALHOST" || ENV === "DEV") {
    baseUrl = "http://localhost:5000";
  } else if (network === "MAINNET") {
    baseUrl = "https://alpha-mainnet.starknet.io";
  } else if (network === "GOERLI") {
    baseUrl = "https://alpha4.starknet.io";
  }
  const provider = new starknet.Provider({
      baseUrl,
      feederGatewayUrl: 'feeder_gateway',
      gatewayUrl: 'gateway',
  });
  const l2PrivateKey = getRequiredEnv(`GOERLI_L2_PRIVATE_KEY`);
  const starkKeyPair = starknet.ec.getKeyPair(l2PrivateKey);
  const starkKeyPub = starknet.ec.getStarkKey(starkKeyPair);;
  const compiledArgentAccount = JSON.parse(
    fs.readFileSync("./abis/l2/ArgentAccount.json").toString("ascii")
  );
  const accountResponse = await provider.deployContract({
    contract: compiledArgentAccount,
    constructorCalldata: [],
    addressSalt: starkKeyPub,
  });
  await provider.waitForTransaction(accountResponse.transaction_hash);
  const accountContract = new starknet.Contract(
    compiledArgentAccount.abi,
    accountResponse.address,
    provider
  );
  const { transaction_hash: initializeTxHash } = await accountContract.initialize(
    starkKeyPub,
    "0"
  );
  await provider.waitForTransaction(initializeTxHash);
  const account = new starknet.Account(provider, accountContract.address, starkKeyPair);
  console.log(account.address);
}

async function flush(targetDomain: string) {
  const l1Signer = getL1Signer(NETWORK);
  const l2Signer = getL2Signer(NETWORK);

  const l1WormholeGatewayAddress = getRequiredEnv(`${NETWORK}_L1_DAI_WORMHOLE_GATEWAY_ADDRESS`);
  const l1WormholeGateway: L1DAIWormholeGateway = (await getL1ContractAt(l1Signer, "L1DAIWormholeGateway", l1WormholeGatewayAddress) as L1DAIWormholeGateway);

  const l2WormholeGatewayAddress = getRequiredEnv(`${NETWORK}_L2_DAI_WORMHOLE_GATEWAY_ADDRESS`);
  const l2WormholeGateway: l2_dai_wormhole_gateway = (await getL2ContractAt(l2Signer, "l2_dai_wormhole_gateway", l2WormholeGatewayAddress) as l2_dai_wormhole_gateway);

  const wormholeJoinInterface = new ethers.utils.Interface([
    "event Settle(bytes32 indexed sourceDomain, uint256 batchedDaiToFlush)",
  ]);
  const l1WormholeJoinAddress = getRequiredEnv(`${NETWORK}_L1_WORMHOLE_JOIN_ADDRESS`);
  const l1WormholeJoin = new ethers.Contract(l1WormholeJoinAddress, wormholeJoinInterface, l1Signer);
  const filter = l1WormholeJoin.filters.Settle(l1String(SOURCE_DOMAIN));
  const events = await l1WormholeJoin.queryFilter(filter);
  const recentEvent = events[events.length - 1];

  const encodedDomain = l2String(targetDomain);
  const [daiToFlushSplit] = await l2WormholeGateway.batched_dai_to_flush(encodedDomain);
  const daiToFlush = toUint(daiToFlushSplit);
  console.log(`DAI to flush: ${daiToFlush}`);

  // check last settle event and amount to flush
  const currentBlock = await l1Signer.provider.getBlockNumber();
  if (daiToFlush > 0 && (!recentEvent || recentEvent.blockNumber > currentBlock + FLUSH_DELAY)) {
    console.log("Sending `flush` transaction");
    const tx = await l2WormholeGateway.flush(encodedDomain, { maxFee: "0" });
    const res = await tx.wait();
    console.log("Success");
  }
}

async function finalizeFlush(targetDomain: string) {
  const l1Signer = getL1Signer(NETWORK);
  const l2Signer = getL2Signer(NETWORK);

  const l1WormholeGatewayAddress = getRequiredEnv(`${NETWORK}_L1_DAI_WORMHOLE_GATEWAY_ADDRESS`);
  const l2WormholeGatewayAddress = getRequiredEnv(`${NETWORK}_L2_DAI_WORMHOLE_GATEWAY_ADDRESS`);
  const starknetAddress = getRequiredEnv(`${NETWORK}_STARKNET_ADDRESS`);
  const l1WormholeGateway: L1DAIWormholeGateway = (await getL1ContractAt(l1Signer, "L1DAIWormholeGateway", l1WormholeGatewayAddress) as L1DAIWormholeGateway);
  const l2WormholeGateway: l2_dai_wormhole_gateway = (await getL2ContractAt(l2Signer, "l2_dai_wormhole_gateway", l2WormholeGatewayAddress) as l2_dai_wormhole_gateway);

  const starknetInterface = new ethers.utils.Interface([
    "event LogMessageToL1(uint256 indexed fromAddress, address indexed toAddress, uint256[] payload)",
    "event ConsumedMessageToL1(uint256 indexed fromAddress, address indexed toAddress,uint256[] payload)",
  ]);
  const starknet = new ethers.Contract(starknetAddress, starknetInterface, l1Signer);
  const logMessageFilter = starknet.filters.LogMessageToL1(l2WormholeGatewayAddress, l1WormholeGatewayAddress);
  const lastFlushBlock = parseInt(fs.readFileSync("lastFlushBlock"));
  const logMessageEvents = await starknet.queryFilter(logMessageFilter, lastFlushBlock);
  if (logMessageEvents.length > 0) {
    logMessageEvents.forEach(async (event) => {
      const consumedMessageFilter = starknet.filters.ConsumedMessageToL1(l2WormholeGatewayAddress, l1WormholeGatewayAddress);
      const consumedMessageEvents = (await starknet.queryFilter(consumedMessageFilter, event.blockNumber)).filter(consumedEvent => {
	const eventArgs = event.args.map(_ => _.toString());
	const consumedEventArgs = consumedEvent.args.map(_ => _.toString());
	return (
	  consumedEventArgs[0] === eventArgs[0] &&
	  consumedEventArgs[1] === eventArgs[1] &&
	  consumedEventArgs[2] === eventArgs[2] &&
	  consumedEventArgs[3] === eventArgs[3]
        );
      });
      if (consumedMessageEvents.length == 0) {
        console.log("Flush message has not been consumed");
        console.log("Sending `finalizeFlush` transaction");
	const tx = await l1WormholeGateway.finalizeFlush(toL1String(event.args.payload[1]), event.args.payload[2]);
	const res = await tx.wait();
	console.log("Success");
	fs.writeFileSync("lastFlushBlock", event.blockNumber.toString());
      } else {
	console.log("Flush message was consumed");
      }
    });
  } else {
    console.log("No pending flush");
  }
}

if (process.argv[2] === "flush") {
  flush(process.argv[3]);
} else if (process.argv[2] === "finalizeFlush") {
  finalizeFlush(process.argv[3]);
}

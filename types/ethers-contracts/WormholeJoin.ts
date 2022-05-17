/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type {
  FunctionFragment,
  Result,
  EventFragment,
} from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
} from "./common";

export type WormholeGUIDStruct = {
  sourceDomain: BytesLike;
  targetDomain: BytesLike;
  receiver: BytesLike;
  operator: BytesLike;
  amount: BigNumberish;
  nonce: BigNumberish;
  timestamp: BigNumberish;
};

export type WormholeGUIDStructOutput = [
  string,
  string,
  string,
  string,
  BigNumber,
  BigNumber,
  number
] & {
  sourceDomain: string;
  targetDomain: string;
  receiver: string;
  operator: string;
  amount: BigNumber;
  nonce: BigNumber;
  timestamp: number;
};

export interface WormholeJoinInterface extends utils.Interface {
  functions: {
    "RAY()": FunctionFragment;
    "WAD()": FunctionFragment;
    "cure()": FunctionFragment;
    "daiJoin()": FunctionFragment;
    "debt(bytes32)": FunctionFragment;
    "deny(address)": FunctionFragment;
    "domain()": FunctionFragment;
    "fees(bytes32)": FunctionFragment;
    "file(bytes32,bytes32,uint256)": FunctionFragment;
    "file(bytes32,address)": FunctionFragment;
    "file(bytes32,bytes32,address)": FunctionFragment;
    "ilk()": FunctionFragment;
    "line(bytes32)": FunctionFragment;
    "mintPending((bytes32,bytes32,bytes32,bytes32,uint128,uint80,uint48),uint256,uint256)": FunctionFragment;
    "rely(address)": FunctionFragment;
    "requestMint((bytes32,bytes32,bytes32,bytes32,uint128,uint80,uint48),uint256,uint256)": FunctionFragment;
    "settle(bytes32,uint256)": FunctionFragment;
    "vat()": FunctionFragment;
    "vow()": FunctionFragment;
    "wards(address)": FunctionFragment;
    "wormholes(bytes32)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "RAY"
      | "WAD"
      | "cure"
      | "daiJoin"
      | "debt"
      | "deny"
      | "domain"
      | "fees"
      | "file(bytes32,bytes32,uint256)"
      | "file(bytes32,address)"
      | "file(bytes32,bytes32,address)"
      | "ilk"
      | "line"
      | "mintPending"
      | "rely"
      | "requestMint"
      | "settle"
      | "vat"
      | "vow"
      | "wards"
      | "wormholes"
  ): FunctionFragment;

  encodeFunctionData(functionFragment: "RAY", values?: undefined): string;
  encodeFunctionData(functionFragment: "WAD", values?: undefined): string;
  encodeFunctionData(functionFragment: "cure", values?: undefined): string;
  encodeFunctionData(functionFragment: "daiJoin", values?: undefined): string;
  encodeFunctionData(functionFragment: "debt", values: [BytesLike]): string;
  encodeFunctionData(functionFragment: "deny", values: [string]): string;
  encodeFunctionData(functionFragment: "domain", values?: undefined): string;
  encodeFunctionData(functionFragment: "fees", values: [BytesLike]): string;
  encodeFunctionData(
    functionFragment: "file(bytes32,bytes32,uint256)",
    values: [BytesLike, BytesLike, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "file(bytes32,address)",
    values: [BytesLike, string]
  ): string;
  encodeFunctionData(
    functionFragment: "file(bytes32,bytes32,address)",
    values: [BytesLike, BytesLike, string]
  ): string;
  encodeFunctionData(functionFragment: "ilk", values?: undefined): string;
  encodeFunctionData(functionFragment: "line", values: [BytesLike]): string;
  encodeFunctionData(
    functionFragment: "mintPending",
    values: [WormholeGUIDStruct, BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "rely", values: [string]): string;
  encodeFunctionData(
    functionFragment: "requestMint",
    values: [WormholeGUIDStruct, BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "settle",
    values: [BytesLike, BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "vat", values?: undefined): string;
  encodeFunctionData(functionFragment: "vow", values?: undefined): string;
  encodeFunctionData(functionFragment: "wards", values: [string]): string;
  encodeFunctionData(
    functionFragment: "wormholes",
    values: [BytesLike]
  ): string;

  decodeFunctionResult(functionFragment: "RAY", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "WAD", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "cure", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "daiJoin", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "debt", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "deny", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "domain", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "fees", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "file(bytes32,bytes32,uint256)",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "file(bytes32,address)",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "file(bytes32,bytes32,address)",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "ilk", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "line", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "mintPending",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "rely", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "requestMint",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "settle", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "vat", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "vow", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "wards", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "wormholes", data: BytesLike): Result;

  events: {
    "Deny(address)": EventFragment;
    "File(bytes32,address)": EventFragment;
    "File(bytes32,bytes32,address)": EventFragment;
    "File(bytes32,bytes32,uint256)": EventFragment;
    "Mint(bytes32,tuple,uint256,uint256,uint256,address)": EventFragment;
    "Register(bytes32,tuple)": EventFragment;
    "Rely(address)": EventFragment;
    "Settle(bytes32,uint256)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "Deny"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "File(bytes32,address)"): EventFragment;
  getEvent(
    nameOrSignatureOrTopic: "File(bytes32,bytes32,address)"
  ): EventFragment;
  getEvent(
    nameOrSignatureOrTopic: "File(bytes32,bytes32,uint256)"
  ): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Mint"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Register"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Rely"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Settle"): EventFragment;
}

export interface DenyEventObject {
  usr: string;
}
export type DenyEvent = TypedEvent<[string], DenyEventObject>;

export type DenyEventFilter = TypedEventFilter<DenyEvent>;

export interface File_bytes32_address_EventObject {
  what: string;
  data: string;
}
export type File_bytes32_address_Event = TypedEvent<
  [string, string],
  File_bytes32_address_EventObject
>;

export type File_bytes32_address_EventFilter =
  TypedEventFilter<File_bytes32_address_Event>;

export interface File_bytes32_bytes32_address_EventObject {
  what: string;
  domain: string;
  data: string;
}
export type File_bytes32_bytes32_address_Event = TypedEvent<
  [string, string, string],
  File_bytes32_bytes32_address_EventObject
>;

export type File_bytes32_bytes32_address_EventFilter =
  TypedEventFilter<File_bytes32_bytes32_address_Event>;

export interface File_bytes32_bytes32_uint256_EventObject {
  what: string;
  domain: string;
  data: BigNumber;
}
export type File_bytes32_bytes32_uint256_Event = TypedEvent<
  [string, string, BigNumber],
  File_bytes32_bytes32_uint256_EventObject
>;

export type File_bytes32_bytes32_uint256_EventFilter =
  TypedEventFilter<File_bytes32_bytes32_uint256_Event>;

export interface MintEventObject {
  hashGUID: string;
  wormholeGUID: WormholeGUIDStructOutput;
  amount: BigNumber;
  maxFeePercentage: BigNumber;
  operatorFee: BigNumber;
  originator: string;
}
export type MintEvent = TypedEvent<
  [string, WormholeGUIDStructOutput, BigNumber, BigNumber, BigNumber, string],
  MintEventObject
>;

export type MintEventFilter = TypedEventFilter<MintEvent>;

export interface RegisterEventObject {
  hashGUID: string;
  wormholeGUID: WormholeGUIDStructOutput;
}
export type RegisterEvent = TypedEvent<
  [string, WormholeGUIDStructOutput],
  RegisterEventObject
>;

export type RegisterEventFilter = TypedEventFilter<RegisterEvent>;

export interface RelyEventObject {
  usr: string;
}
export type RelyEvent = TypedEvent<[string], RelyEventObject>;

export type RelyEventFilter = TypedEventFilter<RelyEvent>;

export interface SettleEventObject {
  sourceDomain: string;
  batchedDaiToFlush: BigNumber;
}
export type SettleEvent = TypedEvent<[string, BigNumber], SettleEventObject>;

export type SettleEventFilter = TypedEventFilter<SettleEvent>;

export interface WormholeJoin extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: WormholeJoinInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    RAY(overrides?: CallOverrides): Promise<[BigNumber]>;

    WAD(overrides?: CallOverrides): Promise<[BigNumber]>;

    cure(
      overrides?: CallOverrides
    ): Promise<[BigNumber] & { cure_: BigNumber }>;

    daiJoin(overrides?: CallOverrides): Promise<[string]>;

    debt(arg0: BytesLike, overrides?: CallOverrides): Promise<[BigNumber]>;

    deny(
      usr: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    domain(overrides?: CallOverrides): Promise<[string]>;

    fees(arg0: BytesLike, overrides?: CallOverrides): Promise<[string]>;

    "file(bytes32,bytes32,uint256)"(
      what: BytesLike,
      domain_: BytesLike,
      data: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    "file(bytes32,address)"(
      what: BytesLike,
      data: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    "file(bytes32,bytes32,address)"(
      what: BytesLike,
      domain_: BytesLike,
      data: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    ilk(overrides?: CallOverrides): Promise<[string]>;

    line(arg0: BytesLike, overrides?: CallOverrides): Promise<[BigNumber]>;

    mintPending(
      wormholeGUID: WormholeGUIDStruct,
      maxFeePercentage: BigNumberish,
      operatorFee: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    rely(
      usr: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    requestMint(
      wormholeGUID: WormholeGUIDStruct,
      maxFeePercentage: BigNumberish,
      operatorFee: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    settle(
      sourceDomain: BytesLike,
      batchedDaiToFlush: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    vat(overrides?: CallOverrides): Promise<[string]>;

    vow(overrides?: CallOverrides): Promise<[string]>;

    wards(arg0: string, overrides?: CallOverrides): Promise<[BigNumber]>;

    wormholes(
      arg0: BytesLike,
      overrides?: CallOverrides
    ): Promise<[boolean, BigNumber] & { blessed: boolean; pending: BigNumber }>;
  };

  RAY(overrides?: CallOverrides): Promise<BigNumber>;

  WAD(overrides?: CallOverrides): Promise<BigNumber>;

  cure(overrides?: CallOverrides): Promise<BigNumber>;

  daiJoin(overrides?: CallOverrides): Promise<string>;

  debt(arg0: BytesLike, overrides?: CallOverrides): Promise<BigNumber>;

  deny(
    usr: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  domain(overrides?: CallOverrides): Promise<string>;

  fees(arg0: BytesLike, overrides?: CallOverrides): Promise<string>;

  "file(bytes32,bytes32,uint256)"(
    what: BytesLike,
    domain_: BytesLike,
    data: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  "file(bytes32,address)"(
    what: BytesLike,
    data: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  "file(bytes32,bytes32,address)"(
    what: BytesLike,
    domain_: BytesLike,
    data: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  ilk(overrides?: CallOverrides): Promise<string>;

  line(arg0: BytesLike, overrides?: CallOverrides): Promise<BigNumber>;

  mintPending(
    wormholeGUID: WormholeGUIDStruct,
    maxFeePercentage: BigNumberish,
    operatorFee: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  rely(
    usr: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  requestMint(
    wormholeGUID: WormholeGUIDStruct,
    maxFeePercentage: BigNumberish,
    operatorFee: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  settle(
    sourceDomain: BytesLike,
    batchedDaiToFlush: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  vat(overrides?: CallOverrides): Promise<string>;

  vow(overrides?: CallOverrides): Promise<string>;

  wards(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;

  wormholes(
    arg0: BytesLike,
    overrides?: CallOverrides
  ): Promise<[boolean, BigNumber] & { blessed: boolean; pending: BigNumber }>;

  callStatic: {
    RAY(overrides?: CallOverrides): Promise<BigNumber>;

    WAD(overrides?: CallOverrides): Promise<BigNumber>;

    cure(overrides?: CallOverrides): Promise<BigNumber>;

    daiJoin(overrides?: CallOverrides): Promise<string>;

    debt(arg0: BytesLike, overrides?: CallOverrides): Promise<BigNumber>;

    deny(usr: string, overrides?: CallOverrides): Promise<void>;

    domain(overrides?: CallOverrides): Promise<string>;

    fees(arg0: BytesLike, overrides?: CallOverrides): Promise<string>;

    "file(bytes32,bytes32,uint256)"(
      what: BytesLike,
      domain_: BytesLike,
      data: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    "file(bytes32,address)"(
      what: BytesLike,
      data: string,
      overrides?: CallOverrides
    ): Promise<void>;

    "file(bytes32,bytes32,address)"(
      what: BytesLike,
      domain_: BytesLike,
      data: string,
      overrides?: CallOverrides
    ): Promise<void>;

    ilk(overrides?: CallOverrides): Promise<string>;

    line(arg0: BytesLike, overrides?: CallOverrides): Promise<BigNumber>;

    mintPending(
      wormholeGUID: WormholeGUIDStruct,
      maxFeePercentage: BigNumberish,
      operatorFee: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber] & { postFeeAmount: BigNumber; totalFee: BigNumber }
    >;

    rely(usr: string, overrides?: CallOverrides): Promise<void>;

    requestMint(
      wormholeGUID: WormholeGUIDStruct,
      maxFeePercentage: BigNumberish,
      operatorFee: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber] & { postFeeAmount: BigNumber; totalFee: BigNumber }
    >;

    settle(
      sourceDomain: BytesLike,
      batchedDaiToFlush: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    vat(overrides?: CallOverrides): Promise<string>;

    vow(overrides?: CallOverrides): Promise<string>;

    wards(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;

    wormholes(
      arg0: BytesLike,
      overrides?: CallOverrides
    ): Promise<[boolean, BigNumber] & { blessed: boolean; pending: BigNumber }>;
  };

  filters: {
    "Deny(address)"(usr?: string | null): DenyEventFilter;
    Deny(usr?: string | null): DenyEventFilter;

    "File(bytes32,address)"(
      what?: BytesLike | null,
      data?: null
    ): File_bytes32_address_EventFilter;
    "File(bytes32,bytes32,address)"(
      what?: BytesLike | null,
      domain?: BytesLike | null,
      data?: null
    ): File_bytes32_bytes32_address_EventFilter;
    "File(bytes32,bytes32,uint256)"(
      what?: BytesLike | null,
      domain?: BytesLike | null,
      data?: null
    ): File_bytes32_bytes32_uint256_EventFilter;

    "Mint(bytes32,tuple,uint256,uint256,uint256,address)"(
      hashGUID?: BytesLike | null,
      wormholeGUID?: null,
      amount?: null,
      maxFeePercentage?: null,
      operatorFee?: null,
      originator?: null
    ): MintEventFilter;
    Mint(
      hashGUID?: BytesLike | null,
      wormholeGUID?: null,
      amount?: null,
      maxFeePercentage?: null,
      operatorFee?: null,
      originator?: null
    ): MintEventFilter;

    "Register(bytes32,tuple)"(
      hashGUID?: BytesLike | null,
      wormholeGUID?: null
    ): RegisterEventFilter;
    Register(
      hashGUID?: BytesLike | null,
      wormholeGUID?: null
    ): RegisterEventFilter;

    "Rely(address)"(usr?: string | null): RelyEventFilter;
    Rely(usr?: string | null): RelyEventFilter;

    "Settle(bytes32,uint256)"(
      sourceDomain?: BytesLike | null,
      batchedDaiToFlush?: null
    ): SettleEventFilter;
    Settle(
      sourceDomain?: BytesLike | null,
      batchedDaiToFlush?: null
    ): SettleEventFilter;
  };

  estimateGas: {
    RAY(overrides?: CallOverrides): Promise<BigNumber>;

    WAD(overrides?: CallOverrides): Promise<BigNumber>;

    cure(overrides?: CallOverrides): Promise<BigNumber>;

    daiJoin(overrides?: CallOverrides): Promise<BigNumber>;

    debt(arg0: BytesLike, overrides?: CallOverrides): Promise<BigNumber>;

    deny(
      usr: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    domain(overrides?: CallOverrides): Promise<BigNumber>;

    fees(arg0: BytesLike, overrides?: CallOverrides): Promise<BigNumber>;

    "file(bytes32,bytes32,uint256)"(
      what: BytesLike,
      domain_: BytesLike,
      data: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    "file(bytes32,address)"(
      what: BytesLike,
      data: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    "file(bytes32,bytes32,address)"(
      what: BytesLike,
      domain_: BytesLike,
      data: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    ilk(overrides?: CallOverrides): Promise<BigNumber>;

    line(arg0: BytesLike, overrides?: CallOverrides): Promise<BigNumber>;

    mintPending(
      wormholeGUID: WormholeGUIDStruct,
      maxFeePercentage: BigNumberish,
      operatorFee: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    rely(
      usr: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    requestMint(
      wormholeGUID: WormholeGUIDStruct,
      maxFeePercentage: BigNumberish,
      operatorFee: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    settle(
      sourceDomain: BytesLike,
      batchedDaiToFlush: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    vat(overrides?: CallOverrides): Promise<BigNumber>;

    vow(overrides?: CallOverrides): Promise<BigNumber>;

    wards(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;

    wormholes(arg0: BytesLike, overrides?: CallOverrides): Promise<BigNumber>;
  };

  populateTransaction: {
    RAY(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    WAD(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    cure(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    daiJoin(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    debt(
      arg0: BytesLike,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    deny(
      usr: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    domain(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    fees(
      arg0: BytesLike,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "file(bytes32,bytes32,uint256)"(
      what: BytesLike,
      domain_: BytesLike,
      data: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    "file(bytes32,address)"(
      what: BytesLike,
      data: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    "file(bytes32,bytes32,address)"(
      what: BytesLike,
      domain_: BytesLike,
      data: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    ilk(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    line(
      arg0: BytesLike,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    mintPending(
      wormholeGUID: WormholeGUIDStruct,
      maxFeePercentage: BigNumberish,
      operatorFee: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    rely(
      usr: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    requestMint(
      wormholeGUID: WormholeGUIDStruct,
      maxFeePercentage: BigNumberish,
      operatorFee: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    settle(
      sourceDomain: BytesLike,
      batchedDaiToFlush: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    vat(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    vow(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    wards(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    wormholes(
      arg0: BytesLike,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
  };
}

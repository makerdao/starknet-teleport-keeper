/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import type {
  Contract,
  Overrides,
  AddTransactionResponse,
  Invocation,
  EstimateFeeResponse,
} from "starknet";
import type { BigNumberish } from "starknet/utils/number";
import type { BlockIdentifier } from "starknet/provider/utils";

export type Uint256 = {
  low: BigNumberish;
  high: BigNumberish;
};
export interface l2_dai_wormhole_gateway extends Contract {
  nonce(options?: {
    blockIdentifier?: BlockIdentifier;
  }): Promise<[BigNumberish] & { res: BigNumberish }>;
  is_open(options?: {
    blockIdentifier?: BlockIdentifier;
  }): Promise<[BigNumberish] & { res: BigNumberish }>;
  dai(options?: {
    blockIdentifier?: BlockIdentifier;
  }): Promise<[BigNumberish] & { res: BigNumberish }>;
  wormhole_gateway(options?: {
    blockIdentifier?: BlockIdentifier;
  }): Promise<[BigNumberish] & { res: BigNumberish }>;
  domain(options?: {
    blockIdentifier?: BlockIdentifier;
  }): Promise<[BigNumberish] & { res: BigNumberish }>;
  valid_domains(
    domain: BigNumberish,
    options?: { blockIdentifier?: BlockIdentifier }
  ): Promise<[BigNumberish] & { res: BigNumberish }>;
  batched_dai_to_flush(
    domain: BigNumberish,
    options?: { blockIdentifier?: BlockIdentifier }
  ): Promise<[Uint256] & { res: Uint256 }>;
  wards(
    user: BigNumberish,
    options?: { blockIdentifier?: BlockIdentifier }
  ): Promise<[BigNumberish] & { res: BigNumberish }>;
  rely(
    user: BigNumberish,
    options?: Overrides
  ): Promise<AddTransactionResponse>;
  deny(
    user: BigNumberish,
    options?: Overrides
  ): Promise<AddTransactionResponse>;
  close(options?: Overrides): Promise<AddTransactionResponse>;
  file(
    what: BigNumberish,
    domain: BigNumberish,
    data: BigNumberish,
    options?: Overrides
  ): Promise<AddTransactionResponse>;
  initiate_wormhole(
    target_domain: BigNumberish,
    receiver: BigNumberish,
    amount: BigNumberish,
    operator: BigNumberish,
    options?: Overrides
  ): Promise<AddTransactionResponse>;
  finalize_register_wormhole(
    target_domain: BigNumberish,
    receiver: BigNumberish,
    amount: BigNumberish,
    operator: BigNumberish,
    nonce: BigNumberish,
    timestamp: BigNumberish,
    options?: Overrides
  ): Promise<AddTransactionResponse>;
  flush(
    target_domain: BigNumberish,
    options?: Overrides
  ): Promise<AddTransactionResponse>;
  functions: {
    nonce(options?: {
      blockIdentifier?: BlockIdentifier;
    }): Promise<[BigNumberish] & { res: BigNumberish }>;
    is_open(options?: {
      blockIdentifier?: BlockIdentifier;
    }): Promise<[BigNumberish] & { res: BigNumberish }>;
    dai(options?: {
      blockIdentifier?: BlockIdentifier;
    }): Promise<[BigNumberish] & { res: BigNumberish }>;
    wormhole_gateway(options?: {
      blockIdentifier?: BlockIdentifier;
    }): Promise<[BigNumberish] & { res: BigNumberish }>;
    domain(options?: {
      blockIdentifier?: BlockIdentifier;
    }): Promise<[BigNumberish] & { res: BigNumberish }>;
    valid_domains(
      domain: BigNumberish,
      options?: { blockIdentifier?: BlockIdentifier }
    ): Promise<[BigNumberish] & { res: BigNumberish }>;
    batched_dai_to_flush(
      domain: BigNumberish,
      options?: { blockIdentifier?: BlockIdentifier }
    ): Promise<[Uint256] & { res: Uint256 }>;
    wards(
      user: BigNumberish,
      options?: { blockIdentifier?: BlockIdentifier }
    ): Promise<[BigNumberish] & { res: BigNumberish }>;
    rely(
      user: BigNumberish,
      options?: Overrides
    ): Promise<AddTransactionResponse>;
    deny(
      user: BigNumberish,
      options?: Overrides
    ): Promise<AddTransactionResponse>;
    close(options?: Overrides): Promise<AddTransactionResponse>;
    file(
      what: BigNumberish,
      domain: BigNumberish,
      data: BigNumberish,
      options?: Overrides
    ): Promise<AddTransactionResponse>;
    initiate_wormhole(
      target_domain: BigNumberish,
      receiver: BigNumberish,
      amount: BigNumberish,
      operator: BigNumberish,
      options?: Overrides
    ): Promise<AddTransactionResponse>;
    finalize_register_wormhole(
      target_domain: BigNumberish,
      receiver: BigNumberish,
      amount: BigNumberish,
      operator: BigNumberish,
      nonce: BigNumberish,
      timestamp: BigNumberish,
      options?: Overrides
    ): Promise<AddTransactionResponse>;
    flush(
      target_domain: BigNumberish,
      options?: Overrides
    ): Promise<AddTransactionResponse>;
  };
  callStatic: {
    nonce(options?: {
      blockIdentifier?: BlockIdentifier;
    }): Promise<[BigNumberish] & { res: BigNumberish }>;
    is_open(options?: {
      blockIdentifier?: BlockIdentifier;
    }): Promise<[BigNumberish] & { res: BigNumberish }>;
    dai(options?: {
      blockIdentifier?: BlockIdentifier;
    }): Promise<[BigNumberish] & { res: BigNumberish }>;
    wormhole_gateway(options?: {
      blockIdentifier?: BlockIdentifier;
    }): Promise<[BigNumberish] & { res: BigNumberish }>;
    domain(options?: {
      blockIdentifier?: BlockIdentifier;
    }): Promise<[BigNumberish] & { res: BigNumberish }>;
    valid_domains(
      domain: BigNumberish,
      options?: { blockIdentifier?: BlockIdentifier }
    ): Promise<[BigNumberish] & { res: BigNumberish }>;
    batched_dai_to_flush(
      domain: BigNumberish,
      options?: { blockIdentifier?: BlockIdentifier }
    ): Promise<[Uint256] & { res: Uint256 }>;
    wards(
      user: BigNumberish,
      options?: { blockIdentifier?: BlockIdentifier }
    ): Promise<[BigNumberish] & { res: BigNumberish }>;
    rely(
      user: BigNumberish,
      options?: { blockIdentifier?: BlockIdentifier }
    ): Promise<[] & {}>;
    deny(
      user: BigNumberish,
      options?: { blockIdentifier?: BlockIdentifier }
    ): Promise<[] & {}>;
    close(options?: { blockIdentifier?: BlockIdentifier }): Promise<[] & {}>;
    file(
      what: BigNumberish,
      domain: BigNumberish,
      data: BigNumberish,
      options?: { blockIdentifier?: BlockIdentifier }
    ): Promise<[] & {}>;
    initiate_wormhole(
      target_domain: BigNumberish,
      receiver: BigNumberish,
      amount: BigNumberish,
      operator: BigNumberish,
      options?: { blockIdentifier?: BlockIdentifier }
    ): Promise<[] & {}>;
    finalize_register_wormhole(
      target_domain: BigNumberish,
      receiver: BigNumberish,
      amount: BigNumberish,
      operator: BigNumberish,
      nonce: BigNumberish,
      timestamp: BigNumberish,
      options?: { blockIdentifier?: BlockIdentifier }
    ): Promise<[] & {}>;
    flush(
      target_domain: BigNumberish,
      options?: { blockIdentifier?: BlockIdentifier }
    ): Promise<[Uint256] & { res: Uint256 }>;
  };
  populateTransaction: {
    nonce(options?: { blockIdentifier?: BlockIdentifier }): Invocation;
    is_open(options?: { blockIdentifier?: BlockIdentifier }): Invocation;
    dai(options?: { blockIdentifier?: BlockIdentifier }): Invocation;
    wormhole_gateway(options?: {
      blockIdentifier?: BlockIdentifier;
    }): Invocation;
    domain(options?: { blockIdentifier?: BlockIdentifier }): Invocation;
    valid_domains(
      domain: BigNumberish,
      options?: { blockIdentifier?: BlockIdentifier }
    ): Invocation;
    batched_dai_to_flush(
      domain: BigNumberish,
      options?: { blockIdentifier?: BlockIdentifier }
    ): Invocation;
    wards(
      user: BigNumberish,
      options?: { blockIdentifier?: BlockIdentifier }
    ): Invocation;
    rely(user: BigNumberish, options?: Overrides): Invocation;
    deny(user: BigNumberish, options?: Overrides): Invocation;
    close(options?: Overrides): Invocation;
    file(
      what: BigNumberish,
      domain: BigNumberish,
      data: BigNumberish,
      options?: Overrides
    ): Invocation;
    initiate_wormhole(
      target_domain: BigNumberish,
      receiver: BigNumberish,
      amount: BigNumberish,
      operator: BigNumberish,
      options?: Overrides
    ): Invocation;
    finalize_register_wormhole(
      target_domain: BigNumberish,
      receiver: BigNumberish,
      amount: BigNumberish,
      operator: BigNumberish,
      nonce: BigNumberish,
      timestamp: BigNumberish,
      options?: Overrides
    ): Invocation;
    flush(target_domain: BigNumberish, options?: Overrides): Invocation;
  };
  estimateFee: {
    nonce(options?: {
      blockIdentifier?: BlockIdentifier;
    }): Promise<EstimateFeeResponse>;
    is_open(options?: {
      blockIdentifier?: BlockIdentifier;
    }): Promise<EstimateFeeResponse>;
    dai(options?: {
      blockIdentifier?: BlockIdentifier;
    }): Promise<EstimateFeeResponse>;
    wormhole_gateway(options?: {
      blockIdentifier?: BlockIdentifier;
    }): Promise<EstimateFeeResponse>;
    domain(options?: {
      blockIdentifier?: BlockIdentifier;
    }): Promise<EstimateFeeResponse>;
    valid_domains(
      domain: BigNumberish,
      options?: { blockIdentifier?: BlockIdentifier }
    ): Promise<EstimateFeeResponse>;
    batched_dai_to_flush(
      domain: BigNumberish,
      options?: { blockIdentifier?: BlockIdentifier }
    ): Promise<EstimateFeeResponse>;
    wards(
      user: BigNumberish,
      options?: { blockIdentifier?: BlockIdentifier }
    ): Promise<EstimateFeeResponse>;
    rely(
      user: BigNumberish,
      options?: { blockIdentifier?: BlockIdentifier }
    ): Promise<EstimateFeeResponse>;
    deny(
      user: BigNumberish,
      options?: { blockIdentifier?: BlockIdentifier }
    ): Promise<EstimateFeeResponse>;
    close(options?: {
      blockIdentifier?: BlockIdentifier;
    }): Promise<EstimateFeeResponse>;
    file(
      what: BigNumberish,
      domain: BigNumberish,
      data: BigNumberish,
      options?: { blockIdentifier?: BlockIdentifier }
    ): Promise<EstimateFeeResponse>;
    initiate_wormhole(
      target_domain: BigNumberish,
      receiver: BigNumberish,
      amount: BigNumberish,
      operator: BigNumberish,
      options?: { blockIdentifier?: BlockIdentifier }
    ): Promise<EstimateFeeResponse>;
    finalize_register_wormhole(
      target_domain: BigNumberish,
      receiver: BigNumberish,
      amount: BigNumberish,
      operator: BigNumberish,
      nonce: BigNumberish,
      timestamp: BigNumberish,
      options?: { blockIdentifier?: BlockIdentifier }
    ): Promise<EstimateFeeResponse>;
    flush(
      target_domain: BigNumberish,
      options?: { blockIdentifier?: BlockIdentifier }
    ): Promise<EstimateFeeResponse>;
  };
}

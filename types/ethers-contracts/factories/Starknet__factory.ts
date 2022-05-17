/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  Signer,
  utils,
  Contract,
  ContractFactory,
  BigNumberish,
  Overrides,
} from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { Starknet, StarknetInterface } from "../Starknet";

const _abi = [
  {
    inputs: [
      {
        internalType: "uint256",
        name: "MessageCancellationDelay",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "fromAddress",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "toAddress",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256[]",
        name: "payload",
        type: "uint256[]",
      },
    ],
    name: "ConsumedMessageToL1",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "fromAddress",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "toAddress",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "selector",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256[]",
        name: "payload",
        type: "uint256[]",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "nonce",
        type: "uint256",
      },
    ],
    name: "ConsumedMessageToL2",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "fromAddress",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "toAddress",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256[]",
        name: "payload",
        type: "uint256[]",
      },
    ],
    name: "LogMessageToL1",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "fromAddress",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "toAddress",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "selector",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256[]",
        name: "payload",
        type: "uint256[]",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "nonce",
        type: "uint256",
      },
    ],
    name: "LogMessageToL2",
    type: "event",
  },
  {
    anonymos: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "fromAddress",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "toAddress",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "selector",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256[]",
        name: "payload",
        type: "uint256[]",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "nonce",
        type: "uint256",
      },
    ],
    name: "MessageToL2Canceled",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "fromAddress",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "toAddress",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "selector",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256[]",
        name: "payload",
        type: "uint256[]",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "nonce",
        type: "uint256",
      },
    ],
    name: "MessageToL2CancellationStarted",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "toAddress",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "selector",
        type: "uint256",
      },
      {
        internalType: "uint256[]",
        name: "payload",
        type: "uint256[]",
      },
      {
        internalType: "uint256",
        name: "nonce",
        type: "uint256",
      },
    ],
    name: "cancelL1ToL2Message",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "fromAddress",
        type: "uint256",
      },
      {
        internalType: "uint256[]",
        name: "payload",
        type: "uint256[]",
      },
    ],
    name: "consumeMessageFromL2",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "msgHash",
        type: "bytes32",
      },
    ],
    name: "l1ToL2MessageCancellations",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "l1ToL2MessageNonce",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "msgHash",
        type: "bytes32",
      },
    ],
    name: "l1ToL2Messages",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "msgHash",
        type: "bytes32",
      },
    ],
    name: "l2ToL1Messages",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "messageCancellationDelay",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "fromAddress",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "toAddress",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "selector",
        type: "uint256",
      },
      {
        internalType: "uint256[]",
        name: "payload",
        type: "uint256[]",
      },
      {
        internalType: "uint256",
        name: "nonce",
        type: "uint256",
      },
    ],
    name: "mockConsumeMessageToL2",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "fromAddress",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "toAddress",
        type: "uint256",
      },
      {
        internalType: "uint256[]",
        name: "payload",
        type: "uint256[]",
      },
    ],
    name: "mockSendMessageFromL2",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "toAddress",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "selector",
        type: "uint256",
      },
      {
        internalType: "uint256[]",
        name: "payload",
        type: "uint256[]",
      },
    ],
    name: "sendMessageToL2",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "toAddress",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "selector",
        type: "uint256",
      },
      {
        internalType: "uint256[]",
        name: "payload",
        type: "uint256[]",
      },
      {
        internalType: "uint256",
        name: "nonce",
        type: "uint256",
      },
    ],
    name: "startL1ToL2MessageCancellation",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b5060405161135e38038061135e8339818101604052602081101561003357600080fd5b81019080805190602001909291905050506100538161005960201b60201c565b50610106565b6100856040518060600160405280602d8152602001611331602d91398261008860201b610e821760201c565b50565b6000826040516020018082805190602001908083835b602083106100c1578051825260208201915060208101905060208303925061009e565b6001836020036101000a038019825116818451168082178552505050505050905001915050604051602081830303815290604052805190602001209050818155505050565b61121c806101156000396000f3fe608060405234801561001057600080fd5b50600436106100a95760003560e01c806377c7d7a91161007157806377c7d7a91461033c5780637a98660b1461037e5780638303bd8a146104155780639be446bf14610433578063a46efaf314610475578063d1fb1509146104b7576100a9565b8063018cccdf146100ae578063067aba99146100cc5780632c9dd5c01461016d5780633e3aa6c5146102045780636170ff1b146102a5575b600080fd5b6100b6610544565b6040518082815260200191505060405180910390f35b61016b600480360360a08110156100e257600080fd5b810190808035906020019092919080359060200190929190803590602001909291908035906020019064010000000081111561011d57600080fd5b82018360208201111561012f57600080fd5b8035906020019184602083028401116401000000008311171561015157600080fd5b909192939192939080359060200190929190505050610589565b005b6101ee6004803603604081101561018357600080fd5b8101908080359060200190929190803590602001906401000000008111156101aa57600080fd5b8201836020820111156101bc57600080fd5b803590602001918460208302840111640100000000831117156101de57600080fd5b90919293919293905050506106ab565b6040518082815260200191505060405180910390f35b61028f6004803603606081101561021a57600080fd5b8101908080359060200190929190803590602001909291908035906020019064010000000081111561024b57600080fd5b82018360208201111561025d57600080fd5b8035906020019184602083028401116401000000008311171561027f57600080fd5b9091929391929390505050610854565b6040518082815260200191505060405180910390f35b61033a600480360360808110156102bb57600080fd5b810190808035906020019092919080359060200190929190803590602001906401000000008111156102ec57600080fd5b8201836020820111156102fe57600080fd5b8035906020019184602083028401116401000000008311171561032057600080fd5b909192939192939080359060200190929190505050610970565b005b6103686004803603602081101561035257600080fd5b8101908080359060200190929190505050610c1d565b6040518082815260200191505060405180910390f35b6104136004803603608081101561039457600080fd5b810190808035906020019092919080359060200190929190803590602001906401000000008111156103c557600080fd5b8201836020820111156103d757600080fd5b803590602001918460208302840111640100000000831117156103f957600080fd5b909192939192939080359060200190929190505050610c40565b005b61041d610d93565b6040518082815260200191505060405180910390f35b61045f6004803603602081101561044957600080fd5b8101908080359060200190929190505050610dbb565b6040518082815260200191505060405180910390f35b6104a16004803603602081101561048b57600080fd5b8101908080359060200190929190505050610dde565b6040518082815260200191505060405180910390f35b610542600480360360608110156104cd57600080fd5b810190808035906020019092919080359060200190929190803590602001906401000000008111156104fe57600080fd5b82018360208201111561051057600080fd5b8035906020019184602083028401116401000000008311171561053257600080fd5b9091929391929390505050610e01565b005b60006105846040518060400160405280602081526020017f535441524b4e45545f312e305f4d5347494e475f4c31544f4c325f4e4f4e4345815250610f00565b905090565b600086868387878790508888604051602001808881526020018781526020018681526020018581526020018481526020018383602002808284378083019250505097505050505050505060405160208183030381529060405280519060200120905060006105f5610f81565b6000838152602001908152602001600020541161067a576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252601a8152602001807f494e56414c49445f4d4553534147455f544f5f434f4e53554d4500000000000081525060200191505060405180910390fd5b6001610684610f81565b60008381526020019081526020016000206000828254039250508190555050505050505050565b600080843373ffffffffffffffffffffffffffffffffffffffff16858590508686604051602001808681526020018581526020018481526020018383602002808284378083019250505095505050505050604051602081830303815290604052805190602001209050600061071e610fa9565b600083815260200190815260200160002054116107a3576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252601a8152602001807f494e56414c49445f4d4553534147455f544f5f434f4e53554d4500000000000081525060200191505060405180910390fd5b3373ffffffffffffffffffffffffffffffffffffffff16857f7a06c571aa77f34d9706c51e5d8122b5595aebeaa34233bfe866f22befb973b1868660405180806020018281038252848482818152602001925060200280828437600081840152601f19601f820116905080830192505050935050505060405180910390a3600161082b610fa9565b600083815260200190815260200160002060008282540392505081905550809150509392505050565b60008061085f610544565b90506108a36040518060400160405280602081526020017f535441524b4e45545f312e305f4d5347494e475f4c31544f4c325f4e4f4e434581525060018301610e82565b84863373ffffffffffffffffffffffffffffffffffffffff167f7d3450d4f5138e54dcb21a322312d50846ead7856426fb38778f8ef33aeccc0187878660405180806020018381526020018281038252858582818152602001925060200280828437600081840152601f19601f82011690508083019250505094505050505060405180910390a460006109398787878786610fd1565b90506001610945610f81565b6000838152602001908152602001600020600082825401925050819055508092505050949350505050565b83853373ffffffffffffffffffffffffffffffffffffffff167f8abd2ec2e0a10c82f5b60ea00455fa96c41fd144f225fcc52b8d83d94f803ed886868660405180806020018381526020018281038252858582818152602001925060200280828437600081840152601f19601f82011690508083019250505094505050505060405180910390a46000610a068686868686610fd1565b90506000610a12610f81565b600083815260200190815260200160002054905060008111610a9c576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260148152602001807f4e4f5f4d4553534147455f544f5f43414e43454c00000000000000000000000081525060200191505060405180910390fd5b6000610aa6611052565b60008481526020019081526020016000205490506000811415610b14576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260228152602001806111c56022913960400191505060405180910390fd5b6000610b1e610d93565b8201905081811015610b98576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252601c8152602001807f43414e43454c5f414c4c4f5745445f54494d455f4f564552464c4f570000000081525060200191505060405180910390fd5b80421015610bf1576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260248152602001806110fb6024913960400191505060405180910390fd5b60018303610bfd610f81565b600086815260200190815260200160002081905550505050505050505050565b6000610c27610f81565b6000838152602001908152602001600020549050919050565b83853373ffffffffffffffffffffffffffffffffffffffff167f2e00dccd686fd6823ec7dc3e125582aa82881b6ff5f6b5a73856e1ea8338a3be86868660405180806020018381526020018281038252858582818152602001925060200280828437600081840152601f19601f82011690508083019250505094505050505060405180910390a46000610cd68686868686610fd1565b90506000610ce2610f81565b600083815260200190815260200160002054905060008111610d6c576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260148152602001807f4e4f5f4d4553534147455f544f5f43414e43454c00000000000000000000000081525060200191505060405180910390fd5b42610d75611052565b60008481526020019081526020016000208190555050505050505050565b6000610db66040518060600160405280602d815260200161114f602d9139610f00565b905090565b6000610dc5611052565b6000838152602001908152602001600020549050919050565b6000610de8610fa9565b6000838152602001908152602001600020549050919050565b600084848484905085856040516020018086815260200185815260200184815260200183836020028082843780830192505050955050505050506040516020818303038152906040528051906020012090506001610e5d610fa9565b6000838152602001908152602001600020600082825401925050819055505050505050565b6000826040516020018082805190602001908083835b60208310610ebb5780518252602082019150602081019050602083039250610e98565b6001836020036101000a038019825116818451168082178552505050505050905001915050604051602081830303815290604052805190602001209050818155505050565b600080826040516020018082805190602001908083835b60208310610f3a5780518252602082019150602081019050602083039250610f17565b6001836020036101000a0380198251168184511680821785525050505050509050019150506040516020818303038152906040528051906020012090508054915050919050565b6000610fa460405180606001604052806026815260200161119f6026913961107a565b905090565b6000610fcc60405180606001604052806023815260200161117c6023913961107a565b905090565b60003373ffffffffffffffffffffffffffffffffffffffff16868387878790508888604051602001808881526020018781526020018681526020018581526020018481526020018383602002808284378083019250505097505050505050505060405160208183030381529060405280519060200120905095945050505050565b600061107560405180606001604052806030815260200161111f6030913961107a565b905090565b600080826040516020018082805190602001908083835b602083106110b45780518252602082019150602081019050602083039250611091565b6001836020036101000a0380198251168184511680821785525050505050509050019150506040516020818303038152906040528051906020012090508091505091905056fe4d4553534147455f43414e43454c4c4154494f4e5f4e4f545f414c4c4f5745445f594554535441524b4e45545f312e305f4d5347494e475f4c31544f4c325f43414e43454c4c4154494f4e5f4d41505050494e47535441524b4e45545f312e305f4d5347494e475f4c31544f4c325f43414e43454c4c4154494f4e5f44454c4159535441524b4e45545f312e305f4d5347494e475f4c32544f4c315f4d41505050494e47535441524b4e45545f312e305f4d5347494e475f4c31544f4c325f4d41505050494e475f56324d4553534147455f43414e43454c4c4154494f4e5f4e4f545f524551554553544544a26469706673582212209e764826b3d45018e1d297afeaa92177b1ff472429cd23137f40d4a8d505219f64736f6c634300060c0033535441524b4e45545f312e305f4d5347494e475f4c31544f4c325f43414e43454c4c4154494f4e5f44454c4159";

type StarknetConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: StarknetConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class Starknet__factory extends ContractFactory {
  constructor(...args: StarknetConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    MessageCancellationDelay: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<Starknet> {
    return super.deploy(
      MessageCancellationDelay,
      overrides || {}
    ) as Promise<Starknet>;
  }
  override getDeployTransaction(
    MessageCancellationDelay: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(
      MessageCancellationDelay,
      overrides || {}
    );
  }
  override attach(address: string): Starknet {
    return super.attach(address) as Starknet;
  }
  override connect(signer: Signer): Starknet__factory {
    return super.connect(signer) as Starknet__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): StarknetInterface {
    return new utils.Interface(_abi) as StarknetInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): Starknet {
    return new Contract(address, _abi, signerOrProvider) as Starknet;
  }
}

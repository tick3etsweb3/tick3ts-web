const abi = [
  {
    inputs: [],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'eventOwner',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'newEventAddress',
        type: 'address',
      },
    ],
    name: 'NewEvent',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'previousOwner',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'newOwner',
        type: 'address',
      },
    ],
    name: 'OwnershipTransferred',
    type: 'event',
  },
  {
    stateMutability: 'payable',
    type: 'fallback',
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: 'name',
        type: 'string',
      },
      {
        internalType: 'string',
        name: 'location',
        type: 'string',
      },
      {
        internalType: 'string',
        name: 'date',
        type: 'string',
      },
      {
        internalType: 'string',
        name: '_ima',
        type: 'string',
      },
      {
        internalType: 'uint256',
        name: '_maxSupp',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '_pri',
        type: 'uint256',
      },
    ],
    name: 'createEvent',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    name: 'events',
    outputs: [
      {
        internalType: 'bool',
        name: 'deployed',
        type: 'bool',
      },
      {
        internalType: 'uint256',
        name: 'totalSales',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'owner',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'newOwner',
        type: 'address',
      },
    ],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'withdraw',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    stateMutability: 'payable',
    type: 'receive',
  },
] as const
export default abi

export const TICKET_CONTRACT_ADDRESS =
  '0x7415515274ed7a9393c97a8903224c26d0024c76'

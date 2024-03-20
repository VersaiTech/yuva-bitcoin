import Web3 from 'web3';

const web3 = new Web3(Web3.givenProvider);

export const CONTRACT_ADDRESS = '0xB771E3A42d77c6B979AC936bF4052fB5660DFf48';
const MLMAbi = [
  {
    type: 'constructor',
    stateMutability: 'nonpayable',
    payable: false,
    inputs: [
      { type: 'address', name: 'ownerAddress', internalType: 'address' },
      { type: 'address', name: '_GUSD', internalType: 'contract IBEP20' },
      { type: 'address', name: '_XPIC', internalType: 'contract IBEP20' },
      { type: 'address', name: '_XPICPlus', internalType: 'contract IBEP20' },
      { type: 'address', name: '_AdminAddress', internalType: 'address' }
    ]
  },
  {
    type: 'event',
    name: 'Airdropped',
    inputs: [
      {
        type: 'address',
        name: '_userAddress',
        internalType: 'address',
        indexed: true
      },
      {
        type: 'uint256',
        name: '_amount',
        internalType: 'uint256',
        indexed: false
      }
    ],
    anonymous: false
  },
  {
    type: 'event',
    name: 'Multisended',
    inputs: [
      {
        type: 'uint256',
        name: 'value',
        internalType: 'uint256',
        indexed: false
      },
      {
        type: 'address',
        name: 'sender',
        internalType: 'address',
        indexed: true
      }
    ],
    anonymous: false
  },
  {
    type: 'event',
    name: 'Reinvestment',
    inputs: [
      {
        type: 'string',
        name: 'investorId',
        internalType: 'string',
        indexed: false
      },
      {
        type: 'uint256',
        name: 'investment',
        internalType: 'uint256',
        indexed: false
      },
      {
        type: 'address',
        name: 'investor',
        internalType: 'address',
        indexed: true
      },
      {
        type: 'uint256',
        name: 'gusdToken',
        internalType: 'uint256',
        indexed: false
      },
      {
        type: 'uint256',
        name: 'xpicToken',
        internalType: 'uint256',
        indexed: false
      },
      {
        type: 'uint256',
        name: 'xpicPToken',
        internalType: 'uint256',
        indexed: false
      },
      {
        type: 'string',
        name: 'invetToken',
        internalType: 'string',
        indexed: false
      }
    ],
    anonymous: false
  },
  {
    type: 'function',
    stateMutability: 'view',
    payable: false,
    outputs: [{ type: 'address', name: '', internalType: 'address' }],
    name: 'AdminAddress',
    inputs: [],
    constant: true
  },
  {
    type: 'function',
    stateMutability: 'nonpayable',
    payable: false,
    outputs: [],
    name: 'ChangeAdmin',
    inputs: [{ type: 'address', name: 'newAdmin', internalType: 'address' }],
    constant: false
  },
  {
    type: 'function',
    stateMutability: 'nonpayable',
    payable: false,
    outputs: [],
    name: 'ChangeOwner',
    inputs: [{ type: 'address', name: 'newOwner', internalType: 'address' }],
    constant: false
  },
  {
    type: 'function',
    stateMutability: 'view',
    payable: false,
    outputs: [{ type: 'uint256', name: '', internalType: 'uint256' }],
    name: 'GusdPrice',
    inputs: [],
    constant: true
  },
  {
    type: 'function',
    stateMutability: 'payable',
    payable: true,
    outputs: [],
    name: 'InvestmentGusd',
    inputs: [
      { type: 'string', name: 'investor', internalType: 'string' },
      { type: 'uint256', name: 'investmentBusd', internalType: 'uint256' },
      { type: 'string', name: 'investToken', internalType: 'string' }
    ],
    constant: false
  },
  {
    type: 'function',
    stateMutability: 'payable',
    payable: true,
    outputs: [],
    name: 'InvestmentXPic',
    inputs: [
      { type: 'string', name: 'investor', internalType: 'string' },
      { type: 'uint256', name: 'investmentBusd', internalType: 'uint256' },
      { type: 'string', name: 'investToken', internalType: 'string' }
    ],
    constant: false
  },
  {
    type: 'function',
    stateMutability: 'payable',
    payable: true,
    outputs: [],
    name: 'InvestmentXPicGusd',
    inputs: [
      { type: 'string', name: 'investor', internalType: 'string' },
      { type: 'uint256', name: 'investmentBusd', internalType: 'uint256' },
      { type: 'string', name: 'investToken', internalType: 'string' }
    ],
    constant: false
  },
  {
    type: 'function',
    stateMutability: 'payable',
    payable: true,
    outputs: [],
    name: 'InvestmentXPicP',
    inputs: [
      { type: 'string', name: 'investor', internalType: 'string' },
      { type: 'uint256', name: 'investmentBusd', internalType: 'uint256' },
      { type: 'string', name: 'investToken', internalType: 'string' }
    ],
    constant: false
  },
  {
    type: 'function',
    stateMutability: 'nonpayable',
    payable: false,
    outputs: [],
    name: 'SetJoinType',
    inputs: [
      { type: 'uint256', name: '_xpixStatus', internalType: 'uint256' },
      { type: 'uint256', name: '_xpixPStatus', internalType: 'uint256' },
      { type: 'uint256', name: '_gusdPStatus', internalType: 'uint256' },
      { type: 'uint256', name: '_xpixGusdStatus', internalType: 'uint256' }
    ],
    constant: false
  },
  {
    type: 'function',
    stateMutability: 'nonpayable',
    payable: false,
    outputs: [],
    name: 'SetTokenRate',
    inputs: [
      { type: 'uint256', name: '_GusdPrice', internalType: 'uint256' },
      { type: 'uint256', name: '_XpicPrice', internalType: 'uint256' },
      { type: 'uint256', name: '_XpicPlusPrice', internalType: 'uint256' }
    ],
    constant: false
  },
  {
    type: 'function',
    stateMutability: 'view',
    payable: false,
    outputs: [{ type: 'uint256', name: '', internalType: 'uint256' }],
    name: 'XpicPlusPrice',
    inputs: [],
    constant: true
  },
  {
    type: 'function',
    stateMutability: 'view',
    payable: false,
    outputs: [{ type: 'uint256', name: '', internalType: 'uint256' }],
    name: 'XpicPrice',
    inputs: [],
    constant: true
  },
  {
    type: 'function',
    stateMutability: 'view',
    payable: false,
    outputs: [{ type: 'uint256', name: '', internalType: 'uint256' }],
    name: 'gusdPStatus',
    inputs: [],
    constant: true
  },
  {
    type: 'function',
    stateMutability: 'view',
    payable: false,
    outputs: [{ type: 'uint256', name: '', internalType: 'uint256' }],
    name: 'gusdRate',
    inputs: [],
    constant: true
  },
  {
    type: 'function',
    stateMutability: 'view',
    payable: false,
    outputs: [{ type: 'address', name: '', internalType: 'address' }],
    name: 'idToAddress',
    inputs: [{ type: 'uint256', name: '', internalType: 'uint256' }],
    constant: true
  },
  {
    type: 'function',
    stateMutability: 'payable',
    payable: true,
    outputs: [],
    name: 'multisendBNB',
    inputs: [
      {
        type: 'address[]',
        name: '_contributors',
        internalType: 'address payable[]'
      },
      { type: 'uint256[]', name: '_balances', internalType: 'uint256[]' }
    ],
    constant: false
  },
  {
    type: 'function',
    stateMutability: 'view',
    payable: false,
    outputs: [{ type: 'address', name: '', internalType: 'address' }],
    name: 'owner',
    inputs: [],
    constant: true
  },
  {
    type: 'function',
    stateMutability: 'view',
    payable: false,
    outputs: [{ type: 'uint256', name: 'id', internalType: 'uint256' }],
    name: 'users',
    inputs: [{ type: 'address', name: '', internalType: 'address' }],
    constant: true
  },
  {
    type: 'function',
    stateMutability: 'nonpayable',
    payable: false,
    outputs: [],
    name: 'withdrawLostBNBFromBalance',
    inputs: [{ type: 'address', name: '_sender', internalType: 'address payable' }],
    constant: false
  },
  {
    type: 'function',
    stateMutability: 'nonpayable',
    payable: false,
    outputs: [],
    name: 'withdrawLostTokenFromBalance',
    inputs: [
      { type: 'uint256', name: 'QtyAmt', internalType: 'uint256' },
      { type: 'address', name: '_TOKAN', internalType: 'contract IBEP20' }
    ],
    constant: false
  },
  {
    type: 'function',
    stateMutability: 'nonpayable',
    payable: false,
    outputs: [],
    name: 'withdrawincomeAura',
    inputs: [
      {
        type: 'address',
        name: '_userAddress',
        internalType: 'address payable'
      },
      { type: 'uint256', name: 'WithAmt', internalType: 'uint256' }
    ],
    constant: false
  },
  {
    type: 'function',
    stateMutability: 'view',
    payable: false,
    outputs: [{ type: 'uint256', name: '', internalType: 'uint256' }],
    name: 'xpicPRate',
    inputs: [],
    constant: true
  },
  {
    type: 'function',
    stateMutability: 'view',
    payable: false,
    outputs: [{ type: 'uint256', name: '', internalType: 'uint256' }],
    name: 'xpicRate',
    inputs: [],
    constant: true
  },
  {
    type: 'function',
    stateMutability: 'view',
    payable: false,
    outputs: [{ type: 'uint256', name: '', internalType: 'uint256' }],
    name: 'xpixGusdStatus',
    inputs: [],
    constant: true
  },
  {
    type: 'function',
    stateMutability: 'view',
    payable: false,
    outputs: [{ type: 'uint256', name: '', internalType: 'uint256' }],
    name: 'xpixPStatus',
    inputs: [],
    constant: true
  },
  {
    type: 'function',
    stateMutability: 'view',
    payable: false,
    outputs: [{ type: 'uint256', name: '', internalType: 'uint256' }],
    name: 'xpixStatus',
    inputs: [],
    constant: true
  }
];
export const CONTRACT = new web3.eth.Contract(MLMAbi, CONTRACT_ADDRESS);


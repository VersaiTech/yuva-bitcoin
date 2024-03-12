import Web3 from 'web3';

const web3 = new Web3(Web3.givenProvider);

export const MLM_CONTRACT_ADDRESS = '0xB771E3A42d77c6B979AC936bF4052fB5660DFf48';
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
export const MLM_CONTRACT = new web3.eth.Contract(MLMAbi, MLM_CONTRACT_ADDRESS);

// GUSD Coin

const CONTRACT_ADDRESS_GUSD = '0x44f441Dc0C9B80905Ac9e37a3d267EE32BeFfdB4';
const dexAbiTokenGusd = [
  {
    type: 'constructor',
    stateMutability: 'nonpayable',
    payable: false,
    inputs: []
  },
  {
    type: 'event',
    name: 'Approval',
    inputs: [
      {
        type: 'address',
        name: 'owner',
        internalType: 'address',
        indexed: true
      },
      {
        type: 'address',
        name: 'spender',
        internalType: 'address',
        indexed: true
      },
      {
        type: 'uint256',
        name: 'value',
        internalType: 'uint256',
        indexed: false
      }
    ],
    anonymous: false
  },
  {
    type: 'event',
    name: 'OwnershipTransferred',
    inputs: [
      {
        type: 'address',
        name: 'previousOwner',
        internalType: 'address',
        indexed: true
      },
      {
        type: 'address',
        name: 'newOwner',
        internalType: 'address',
        indexed: true
      }
    ],
    anonymous: false
  },
  {
    type: 'event',
    name: 'Transfer',
    inputs: [
      { type: 'address', name: 'from', internalType: 'address', indexed: true },
      { type: 'address', name: 'to', internalType: 'address', indexed: true },
      {
        type: 'uint256',
        name: 'value',
        internalType: 'uint256',
        indexed: false
      }
    ],
    anonymous: false
  },
  {
    type: 'function',
    stateMutability: 'view',
    payable: false,
    outputs: [{ type: 'uint8', name: '', internalType: 'uint8' }],
    name: '_decimals',
    inputs: [],
    constant: true
  },
  {
    type: 'function',
    stateMutability: 'view',
    payable: false,
    outputs: [{ type: 'string', name: '', internalType: 'string' }],
    name: '_name',
    inputs: [],
    constant: true
  },
  {
    type: 'function',
    stateMutability: 'view',
    payable: false,
    outputs: [{ type: 'string', name: '', internalType: 'string' }],
    name: '_symbol',
    inputs: [],
    constant: true
  },
  {
    type: 'function',
    stateMutability: 'view',
    payable: false,
    outputs: [{ type: 'uint256', name: '', internalType: 'uint256' }],
    name: 'allowance',
    inputs: [
      { type: 'address', name: 'owner', internalType: 'address' },
      { type: 'address', name: 'spender', internalType: 'address' }
    ],
    constant: true
  },
  {
    type: 'function',
    stateMutability: 'nonpayable',
    payable: false,
    outputs: [{ type: 'bool', name: '', internalType: 'bool' }],
    name: 'approve',
    inputs: [
      { type: 'address', name: 'spender', internalType: 'address' },
      { type: 'uint256', name: 'amount', internalType: 'uint256' }
    ],
    constant: false
  },
  {
    type: 'function',
    stateMutability: 'view',
    payable: false,
    outputs: [{ type: 'uint256', name: '', internalType: 'uint256' }],
    name: 'balanceOf',
    inputs: [{ type: 'address', name: 'account', internalType: 'address' }],
    constant: true
  },
  {
    type: 'function',
    stateMutability: 'nonpayable',
    payable: false,
    outputs: [{ type: 'bool', name: '', internalType: 'bool' }],
    name: 'burn',
    inputs: [{ type: 'uint256', name: 'amount', internalType: 'uint256' }],
    constant: false
  },
  {
    type: 'function',
    stateMutability: 'view',
    payable: false,
    outputs: [{ type: 'uint8', name: '', internalType: 'uint8' }],
    name: 'decimals',
    inputs: [],
    constant: true
  },
  {
    type: 'function',
    stateMutability: 'nonpayable',
    payable: false,
    outputs: [{ type: 'bool', name: '', internalType: 'bool' }],
    name: 'decreaseAllowance',
    inputs: [
      { type: 'address', name: 'spender', internalType: 'address' },
      { type: 'uint256', name: 'subtractedValue', internalType: 'uint256' }
    ],
    constant: false
  },
  {
    type: 'function',
    stateMutability: 'view',
    payable: false,
    outputs: [{ type: 'address', name: '', internalType: 'address' }],
    name: 'getOwner',
    inputs: [],
    constant: true
  },
  {
    type: 'function',
    stateMutability: 'nonpayable',
    payable: false,
    outputs: [{ type: 'bool', name: '', internalType: 'bool' }],
    name: 'increaseAllowance',
    inputs: [
      { type: 'address', name: 'spender', internalType: 'address' },
      { type: 'uint256', name: 'addedValue', internalType: 'uint256' }
    ],
    constant: false
  },
  {
    type: 'function',
    stateMutability: 'nonpayable',
    payable: false,
    outputs: [{ type: 'bool', name: '', internalType: 'bool' }],
    name: 'mint',
    inputs: [{ type: 'uint256', name: 'amount', internalType: 'uint256' }],
    constant: false
  },
  {
    type: 'function',
    stateMutability: 'view',
    payable: false,
    outputs: [{ type: 'string', name: '', internalType: 'string' }],
    name: 'name',
    inputs: [],
    constant: true
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
    stateMutability: 'nonpayable',
    payable: false,
    outputs: [],
    name: 'renounceOwnership',
    inputs: [],
    constant: false
  },
  {
    type: 'function',
    stateMutability: 'view',
    payable: false,
    outputs: [{ type: 'string', name: '', internalType: 'string' }],
    name: 'symbol',
    inputs: [],
    constant: true
  },
  {
    type: 'function',
    stateMutability: 'view',
    payable: false,
    outputs: [{ type: 'uint256', name: '', internalType: 'uint256' }],
    name: 'totalSupply',
    inputs: [],
    constant: true
  },
  {
    type: 'function',
    stateMutability: 'nonpayable',
    payable: false,
    outputs: [{ type: 'bool', name: '', internalType: 'bool' }],
    name: 'transfer',
    inputs: [
      { type: 'address', name: 'recipient', internalType: 'address' },
      { type: 'uint256', name: 'amount', internalType: 'uint256' }
    ],
    constant: false
  },
  {
    type: 'function',
    stateMutability: 'nonpayable',
    payable: false,
    outputs: [{ type: 'bool', name: '', internalType: 'bool' }],
    name: 'transferFrom',
    inputs: [
      { type: 'address', name: 'sender', internalType: 'address' },
      { type: 'address', name: 'recipient', internalType: 'address' },
      { type: 'uint256', name: 'amount', internalType: 'uint256' }
    ],
    constant: false
  },
  {
    type: 'function',
    stateMutability: 'nonpayable',
    payable: false,
    outputs: [],
    name: 'transferOwnership',
    inputs: [{ type: 'address', name: 'newOwner', internalType: 'address' }],
    constant: false
  }
];
export const GUSD_CONTRACT = new web3.eth.Contract(dexAbiTokenGusd, CONTRACT_ADDRESS_GUSD);

// XPIC Coin

const contractAddressXPIC = '0xb0DBDDE3C4c790514c77B84Dd272501d4962F1B4';

const dexAbiTokenXPIC = [
  {
    type: 'constructor',
    stateMutability: 'nonpayable',
    payable: false,
    inputs: []
  },
  {
    type: 'event',
    name: 'Approval',
    inputs: [
      {
        type: 'address',
        name: 'owner',
        internalType: 'address',
        indexed: true
      },
      {
        type: 'address',
        name: 'spender',
        internalType: 'address',
        indexed: true
      },
      {
        type: 'uint256',
        name: 'value',
        internalType: 'uint256',
        indexed: false
      }
    ],
    anonymous: false
  },
  {
    type: 'event',
    name: 'OwnershipTransferred',
    inputs: [
      {
        type: 'address',
        name: 'previousOwner',
        internalType: 'address',
        indexed: true
      },
      {
        type: 'address',
        name: 'newOwner',
        internalType: 'address',
        indexed: true
      }
    ],
    anonymous: false
  },
  {
    type: 'event',
    name: 'Transfer',
    inputs: [
      { type: 'address', name: 'from', internalType: 'address', indexed: true },
      { type: 'address', name: 'to', internalType: 'address', indexed: true },
      {
        type: 'uint256',
        name: 'value',
        internalType: 'uint256',
        indexed: false
      }
    ],
    anonymous: false
  },
  {
    type: 'function',
    stateMutability: 'view',
    payable: false,
    outputs: [{ type: 'uint8', name: '', internalType: 'uint8' }],
    name: '_decimals',
    inputs: [],
    constant: true
  },
  {
    type: 'function',
    stateMutability: 'view',
    payable: false,
    outputs: [{ type: 'string', name: '', internalType: 'string' }],
    name: '_name',
    inputs: [],
    constant: true
  },
  {
    type: 'function',
    stateMutability: 'view',
    payable: false,
    outputs: [{ type: 'string', name: '', internalType: 'string' }],
    name: '_symbol',
    inputs: [],
    constant: true
  },
  {
    type: 'function',
    stateMutability: 'view',
    payable: false,
    outputs: [{ type: 'uint256', name: '', internalType: 'uint256' }],
    name: 'allowance',
    inputs: [
      { type: 'address', name: 'owner', internalType: 'address' },
      { type: 'address', name: 'spender', internalType: 'address' }
    ],
    constant: true
  },
  {
    type: 'function',
    stateMutability: 'nonpayable',
    payable: false,
    outputs: [{ type: 'bool', name: '', internalType: 'bool' }],
    name: 'approve',
    inputs: [
      { type: 'address', name: 'spender', internalType: 'address' },
      { type: 'uint256', name: 'amount', internalType: 'uint256' }
    ],
    constant: false
  },
  {
    type: 'function',
    stateMutability: 'view',
    payable: false,
    outputs: [{ type: 'uint256', name: '', internalType: 'uint256' }],
    name: 'balanceOf',
    inputs: [{ type: 'address', name: 'account', internalType: 'address' }],
    constant: true
  },
  {
    type: 'function',
    stateMutability: 'nonpayable',
    payable: false,
    outputs: [{ type: 'bool', name: '', internalType: 'bool' }],
    name: 'burn',
    inputs: [{ type: 'uint256', name: 'amount', internalType: 'uint256' }],
    constant: false
  },
  {
    type: 'function',
    stateMutability: 'view',
    payable: false,
    outputs: [{ type: 'uint8', name: '', internalType: 'uint8' }],
    name: 'decimals',
    inputs: [],
    constant: true
  },
  {
    type: 'function',
    stateMutability: 'nonpayable',
    payable: false,
    outputs: [{ type: 'bool', name: '', internalType: 'bool' }],
    name: 'decreaseAllowance',
    inputs: [
      { type: 'address', name: 'spender', internalType: 'address' },
      { type: 'uint256', name: 'subtractedValue', internalType: 'uint256' }
    ],
    constant: false
  },
  {
    type: 'function',
    stateMutability: 'view',
    payable: false,
    outputs: [{ type: 'address', name: '', internalType: 'address' }],
    name: 'getOwner',
    inputs: [],
    constant: true
  },
  {
    type: 'function',
    stateMutability: 'nonpayable',
    payable: false,
    outputs: [{ type: 'bool', name: '', internalType: 'bool' }],
    name: 'increaseAllowance',
    inputs: [
      { type: 'address', name: 'spender', internalType: 'address' },
      { type: 'uint256', name: 'addedValue', internalType: 'uint256' }
    ],
    constant: false
  },
  {
    type: 'function',
    stateMutability: 'nonpayable',
    payable: false,
    outputs: [{ type: 'bool', name: '', internalType: 'bool' }],
    name: 'mint',
    inputs: [{ type: 'uint256', name: 'amount', internalType: 'uint256' }],
    constant: false
  },
  {
    type: 'function',
    stateMutability: 'view',
    payable: false,
    outputs: [{ type: 'string', name: '', internalType: 'string' }],
    name: 'name',
    inputs: [],
    constant: true
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
    stateMutability: 'nonpayable',
    payable: false,
    outputs: [],
    name: 'renounceOwnership',
    inputs: [],
    constant: false
  },
  {
    type: 'function',
    stateMutability: 'view',
    payable: false,
    outputs: [{ type: 'string', name: '', internalType: 'string' }],
    name: 'symbol',
    inputs: [],
    constant: true
  },
  {
    type: 'function',
    stateMutability: 'view',
    payable: false,
    outputs: [{ type: 'uint256', name: '', internalType: 'uint256' }],
    name: 'totalSupply',
    inputs: [],
    constant: true
  },
  {
    type: 'function',
    stateMutability: 'nonpayable',
    payable: false,
    outputs: [{ type: 'bool', name: '', internalType: 'bool' }],
    name: 'transfer',
    inputs: [
      { type: 'address', name: 'recipient', internalType: 'address' },
      { type: 'uint256', name: 'amount', internalType: 'uint256' }
    ],
    constant: false
  },
  {
    type: 'function',
    stateMutability: 'nonpayable',
    payable: false,
    outputs: [{ type: 'bool', name: '', internalType: 'bool' }],
    name: 'transferFrom',
    inputs: [
      { type: 'address', name: 'sender', internalType: 'address' },
      { type: 'address', name: 'recipient', internalType: 'address' },
      { type: 'uint256', name: 'amount', internalType: 'uint256' }
    ],
    constant: false
  },
  {
    type: 'function',
    stateMutability: 'nonpayable',
    payable: false,
    outputs: [],
    name: 'transferOwnership',
    inputs: [{ type: 'address', name: 'newOwner', internalType: 'address' }],
    constant: false
  }
];
export const XPIC_CONTRACT = new web3.eth.Contract(dexAbiTokenXPIC, contractAddressXPIC);

// XPIC Plus Coin

const constractAddressXPICPlus = '0xFBc0ecb7FD4EC61917D98Fa66d30F30e565A5987';

const dexAbiTokenXPICPlus = [
  {
    type: 'constructor',
    stateMutability: 'nonpayable',
    payable: false,
    inputs: []
  },
  {
    type: 'event',
    name: 'Approval',
    inputs: [
      {
        type: 'address',
        name: 'owner',
        internalType: 'address',
        indexed: true
      },
      {
        type: 'address',
        name: 'spender',
        internalType: 'address',
        indexed: true
      },
      {
        type: 'uint256',
        name: 'value',
        internalType: 'uint256',
        indexed: false
      }
    ],
    anonymous: false
  },
  {
    type: 'event',
    name: 'OwnershipTransferred',
    inputs: [
      {
        type: 'address',
        name: 'previousOwner',
        internalType: 'address',
        indexed: true
      },
      {
        type: 'address',
        name: 'newOwner',
        internalType: 'address',
        indexed: true
      }
    ],
    anonymous: false
  },
  {
    type: 'event',
    name: 'Transfer',
    inputs: [
      { type: 'address', name: 'from', internalType: 'address', indexed: true },
      { type: 'address', name: 'to', internalType: 'address', indexed: true },
      {
        type: 'uint256',
        name: 'value',
        internalType: 'uint256',
        indexed: false
      }
    ],
    anonymous: false
  },
  {
    type: 'function',
    stateMutability: 'view',
    payable: false,
    outputs: [{ type: 'uint8', name: '', internalType: 'uint8' }],
    name: '_decimals',
    inputs: [],
    constant: true
  },
  {
    type: 'function',
    stateMutability: 'view',
    payable: false,
    outputs: [{ type: 'string', name: '', internalType: 'string' }],
    name: '_name',
    inputs: [],
    constant: true
  },
  {
    type: 'function',
    stateMutability: 'view',
    payable: false,
    outputs: [{ type: 'string', name: '', internalType: 'string' }],
    name: '_symbol',
    inputs: [],
    constant: true
  },
  {
    type: 'function',
    stateMutability: 'view',
    payable: false,
    outputs: [{ type: 'uint256', name: '', internalType: 'uint256' }],
    name: 'allowance',
    inputs: [
      { type: 'address', name: 'owner', internalType: 'address' },
      { type: 'address', name: 'spender', internalType: 'address' }
    ],
    constant: true
  },
  {
    type: 'function',
    stateMutability: 'nonpayable',
    payable: false,
    outputs: [{ type: 'bool', name: '', internalType: 'bool' }],
    name: 'approve',
    inputs: [
      { type: 'address', name: 'spender', internalType: 'address' },
      { type: 'uint256', name: 'amount', internalType: 'uint256' }
    ],
    constant: false
  },
  {
    type: 'function',
    stateMutability: 'view',
    payable: false,
    outputs: [{ type: 'uint256', name: '', internalType: 'uint256' }],
    name: 'balanceOf',
    inputs: [{ type: 'address', name: 'account', internalType: 'address' }],
    constant: true
  },
  {
    type: 'function',
    stateMutability: 'nonpayable',
    payable: false,
    outputs: [{ type: 'bool', name: '', internalType: 'bool' }],
    name: 'burn',
    inputs: [{ type: 'uint256', name: 'amount', internalType: 'uint256' }],
    constant: false
  },
  {
    type: 'function',
    stateMutability: 'view',
    payable: false,
    outputs: [{ type: 'uint8', name: '', internalType: 'uint8' }],
    name: 'decimals',
    inputs: [],
    constant: true
  },
  {
    type: 'function',
    stateMutability: 'nonpayable',
    payable: false,
    outputs: [{ type: 'bool', name: '', internalType: 'bool' }],
    name: 'decreaseAllowance',
    inputs: [
      { type: 'address', name: 'spender', internalType: 'address' },
      { type: 'uint256', name: 'subtractedValue', internalType: 'uint256' }
    ],
    constant: false
  },
  {
    type: 'function',
    stateMutability: 'view',
    payable: false,
    outputs: [{ type: 'address', name: '', internalType: 'address' }],
    name: 'getOwner',
    inputs: [],
    constant: true
  },
  {
    type: 'function',
    stateMutability: 'nonpayable',
    payable: false,
    outputs: [{ type: 'bool', name: '', internalType: 'bool' }],
    name: 'increaseAllowance',
    inputs: [
      { type: 'address', name: 'spender', internalType: 'address' },
      { type: 'uint256', name: 'addedValue', internalType: 'uint256' }
    ],
    constant: false
  },
  {
    type: 'function',
    stateMutability: 'nonpayable',
    payable: false,
    outputs: [{ type: 'bool', name: '', internalType: 'bool' }],
    name: 'mint',
    inputs: [{ type: 'uint256', name: 'amount', internalType: 'uint256' }],
    constant: false
  },
  {
    type: 'function',
    stateMutability: 'view',
    payable: false,
    outputs: [{ type: 'string', name: '', internalType: 'string' }],
    name: 'name',
    inputs: [],
    constant: true
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
    stateMutability: 'nonpayable',
    payable: false,
    outputs: [],
    name: 'renounceOwnership',
    inputs: [],
    constant: false
  },
  {
    type: 'function',
    stateMutability: 'view',
    payable: false,
    outputs: [{ type: 'string', name: '', internalType: 'string' }],
    name: 'symbol',
    inputs: [],
    constant: true
  },
  {
    type: 'function',
    stateMutability: 'view',
    payable: false,
    outputs: [{ type: 'uint256', name: '', internalType: 'uint256' }],
    name: 'totalSupply',
    inputs: [],
    constant: true
  },
  {
    type: 'function',
    stateMutability: 'nonpayable',
    payable: false,
    outputs: [{ type: 'bool', name: '', internalType: 'bool' }],
    name: 'transfer',
    inputs: [
      { type: 'address', name: 'recipient', internalType: 'address' },
      { type: 'uint256', name: 'amount', internalType: 'uint256' }
    ],
    constant: false
  },
  {
    type: 'function',
    stateMutability: 'nonpayable',
    payable: false,
    outputs: [{ type: 'bool', name: '', internalType: 'bool' }],
    name: 'transferFrom',
    inputs: [
      { type: 'address', name: 'sender', internalType: 'address' },
      { type: 'address', name: 'recipient', internalType: 'address' },
      { type: 'uint256', name: 'amount', internalType: 'uint256' }
    ],
    constant: false
  },
  {
    type: 'function',
    stateMutability: 'nonpayable',
    payable: false,
    outputs: [],
    name: 'transferOwnership',
    inputs: [{ type: 'address', name: 'newOwner', internalType: 'address' }],
    constant: false
  }
];
export const XPIC_PLUS_CONTRACT = new web3.eth.Contract(dexAbiTokenXPICPlus, constractAddressXPICPlus);
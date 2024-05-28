const { ExternalSwap } = require("../models/ExternalSwap");
const { ExternalAdmin } = require("../models/ExternalAdminModel");
const Coin = require("../models/Coin");
const Joi = require("joi");
const Admin = require("../models/AdminModel");
const { ethers } = require("ethers");
const ABI = [
  {
    inputs: [
      {
        internalType: "address",
        name: "initialOwner",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  { inputs: [], name: "ECDSAInvalidSignature", type: "error" },
  {
    inputs: [{ internalType: "uint256", name: "length", type: "uint256" }],
    name: "ECDSAInvalidSignatureLength",
    type: "error",
  },
  {
    inputs: [{ internalType: "bytes32", name: "s", type: "bytes32" }],
    name: "ECDSAInvalidSignatureS",
    type: "error",
  },
  {
    inputs: [
      { internalType: "address", name: "spender", type: "address" },
      {
        internalType: "uint256",
        name: "allowance",
        type: "uint256",
      },
      { internalType: "uint256", name: "needed", type: "uint256" },
    ],
    name: "ERC20InsufficientAllowance",
    type: "error",
  },
  {
    inputs: [
      { internalType: "address", name: "sender", type: "address" },
      { internalType: "uint256", name: "balance", type: "uint256" },
      { internalType: "uint256", name: "needed", type: "uint256" },
    ],
    name: "ERC20InsufficientBalance",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "approver",
        type: "address",
      },
    ],
    name: "ERC20InvalidApprover",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "receiver",
        type: "address",
      },
    ],
    name: "ERC20InvalidReceiver",
    type: "error",
  },
  {
    inputs: [{ internalType: "address", name: "sender", type: "address" }],
    name: "ERC20InvalidSender",
    type: "error",
  },
  {
    inputs: [{ internalType: "address", name: "spender", type: "address" }],
    name: "ERC20InvalidSpender",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "deadline",
        type: "uint256",
      },
    ],
    name: "ERC2612ExpiredSignature",
    type: "error",
  },
  {
    inputs: [
      { internalType: "address", name: "signer", type: "address" },
      { internalType: "address", name: "owner", type: "address" },
    ],
    name: "ERC2612InvalidSigner",
    type: "error",
  },
  {
    inputs: [
      { internalType: "address", name: "account", type: "address" },
      {
        internalType: "uint256",
        name: "currentNonce",
        type: "uint256",
      },
    ],
    name: "InvalidAccountNonce",
    type: "error",
  },
  { inputs: [], name: "InvalidShortString", type: "error" },
  {
    inputs: [{ internalType: "address", name: "owner", type: "address" }],
    name: "OwnableInvalidOwner",
    type: "error",
  },
  {
    inputs: [{ internalType: "address", name: "account", type: "address" }],
    name: "OwnableUnauthorizedAccount",
    type: "error",
  },
  {
    inputs: [{ internalType: "string", name: "str", type: "string" }],
    name: "StringTooLong",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [],
    name: "EIP712DomainChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [],
    name: "DOMAIN_SEPARATOR",
    outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "owner", type: "address" },
      { internalType: "address", name: "spender", type: "address" },
    ],
    name: "allowance",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "spender", type: "address" },
      { internalType: "uint256", name: "value", type: "uint256" },
    ],
    name: "approve",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "account", type: "address" }],
    name: "balanceOf",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "value", type: "uint256" }],
    name: "burn",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "account", type: "address" },
      { internalType: "uint256", name: "value", type: "uint256" },
    ],
    name: "burnFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "decimals",
    outputs: [{ internalType: "uint8", name: "", type: "uint8" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "eip712Domain",
    outputs: [
      { internalType: "bytes1", name: "fields", type: "bytes1" },
      { internalType: "string", name: "name", type: "string" },
      { internalType: "string", name: "version", type: "string" },
      { internalType: "uint256", name: "chainId", type: "uint256" },
      {
        internalType: "address",
        name: "verifyingContract",
        type: "address",
      },
      { internalType: "bytes32", name: "salt", type: "bytes32" },
      {
        internalType: "uint256[]",
        name: "extensions",
        type: "uint256[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "amount", type: "uint256" },
    ],
    name: "mint",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "owner", type: "address" }],
    name: "nonces",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "owner", type: "address" },
      { internalType: "address", name: "spender", type: "address" },
      { internalType: "uint256", name: "value", type: "uint256" },
      {
        internalType: "uint256",
        name: "deadline",
        type: "uint256",
      },
      { internalType: "uint8", name: "v", type: "uint8" },
      { internalType: "bytes32", name: "r", type: "bytes32" },
      { internalType: "bytes32", name: "s", type: "bytes32" },
    ],
    name: "permit",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "value", type: "uint256" },
    ],
    name: "transfer",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "from", type: "address" },
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "value", type: "uint256" },
    ],
    name: "transferFrom",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

function generateOrderID() {
  const prefix = "YBODR"; // Prefix for the order ID
  const randomPart = Math.random().toString(36).substr(2, 5).toUpperCase(); // Random alphanumeric string
  const timestampPart = Date.now().toString(36).toUpperCase().slice(-5); // Timestamp converted to base36 string

  return `${prefix}-${randomPart}-${timestampPart}`;
}

async function createExternalSwap(req, res) {
  // Joi schema for request validation
  const ExternalSwapSchema = Joi.object({
    deposit_type: Joi.string().valid("usdt", "bnb").required(),
    amount: Joi.number().required(),
    transaction_hash: Joi.string().required(),
    wallet_address: Joi.string().required(),
    status: Joi.string()
      .valid("Pending", "Approved", "Rejected")
      .default("Pending"),
    reason: Joi.string().allow(null, ""),
  });

  try {
    // Validate request body
    const { error, value } = ExternalSwapSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const {
      deposit_type,
      amount,
      transaction_hash,
      wallet_address,
      status,
      reason,
    } = value;
    console.log("value", value);

    //if trasaction hash already existsgive error
    const existingExternalSwap = await ExternalSwap.findOne({
      transaction_hash,
    });
    if (existingExternalSwap) {
      return res.status(400).json({ error: "Transaction hash already exists" });
    }

    //if order id already exists give error
    const existingOrderId = await ExternalSwap.findOne({
      orderId: generateOrderID(),
    });
    if (existingOrderId) {
      return res.status(400).json({ error: "Order id already exists" });
    }

    const newExternalSwap = new ExternalSwap({
      deposit_type: value.deposit_type,
      amount: value.amount,
      transaction_hash: value.transaction_hash,
      wallet_address: value.wallet_address,
      orderId: generateOrderID(),
      status,
      reason,
    });
    // Save ExternalSwap object to database
    const savedExternalSwap = await newExternalSwap.save();

    

    return res.status(200).json({
      success: true,
      message: "ExternalSwap created successfully",
      data: savedExternalSwap,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

async function adminApproval(req, res) {
  const ExternalAdminSchema = Joi.object({
    status: Joi.string().required().valid("Pending", "Approved", "Rejected"),
    reason: Joi.string().allow(null, ""),
  });

  try {
    const { error, value } = ExternalAdminSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const { status, reason } = value;

    const isOrderIdExist = await ExternalSwap.findOne({
      orderId: req.params.orderId,
    });
    if (!isOrderIdExist) {
      return res.status(400).json({ error: "Order id does not exist" });
    }

    const createAdminData = new ExternalAdmin({
      orderId: req.params.orderId,
      status: value.status,
      reason: value.reason,
    });
    const saveAdminData = await createAdminData.save();

    const updatedExternalSwap = await ExternalSwap.updateOne(
      { orderId: req.params.orderId },
      { $set: { status, reason } }
    );
    return res.status(200).json({
      success: true,
      message: "ExternalSwap updated successfully",
      data: updatedExternalSwap,
      newData: saveAdminData,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

async function getAllExternalSwap(req, res) {
  const Schema = Joi.object({
    page_number: Joi.number(),
    count: Joi.number(),
  });
  const { error, value } = Schema.validate(req.params);

  if (error) {
    return res
      .status(400)
      .json({ status: false, error: error.details[0].message });
  }
  try {
    const page_number = value.page_number || 1;
    const count = value.count || 10;
    const offset = (page_number - 1) * count;

    const totalExternalSwap = await ExternalSwap.countDocuments();
    const externalSwap = await ExternalSwap.find()
      .sort({ createdAt: -1 })
      .skip(offset)
      .limit(count);

    if (!externalSwap || externalSwap.length === 0) {
      return res.status(200).json({
        status: false,
        message: "No ExternalSwap found",
        externalSwap: [],
      });
    }

    return res.status(200).json({
      status: true,
      message: "ExternalSwap found",
      externalSwap: externalSwap,
      totalExternalSwap: totalExternalSwap,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

async function findExternalSwap(req, res) {
  const Schema = Joi.object({
    orderId: Joi.string().allow(null, ""),
    wallet_address: Joi.string().allow(null, ""),
  });
  const { error, value } = Schema.validate(req.body);
  if (error) {
    return res
      .status(400)
      .json({ status: false, error: error.details[0].message });
  }
  try {
    let externalSwap = [];
    if (value.orderId) {
      externalSwap = await ExternalSwap.findOne({ orderId: value.orderId });
    } else if (value.wallet_address) {
      externalSwap = await ExternalSwap.find({
        wallet_address: value.wallet_address,
      });
    } else {
      return res.status(400).json({
        status: false,
        message: "Please provide orderId or wallet_address",
      });
    }
    if (!externalSwap || externalSwap.length === 0) {
      return res.status(200).json({
        status: false,
        message: "No ExternalSwap found",
        externalSwap: [],
      });
    }
    return res.status(200).json({
      status: true,
      message: "ExternalSwap found",
      externalSwap: externalSwap,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

async function transferYuva(req, res) {
  const totalExternalSwap = await ExternalSwap.countDocuments();
  const externalSwap = await ExternalSwap.find({ status: "Pending" });

  if (!externalSwap || externalSwap.length === 0) {
    return {
      status: false,
      message: "No ExternalSwap found",
      externalSwap: [],
    };
  }

  for (let i = 0; i < externalSwap.length; i++) {
    const {
      deposit_type,
      amount,
      transaction_hash,
      wallet_address,
      status,
      reason,
    } = externalSwap[i];

    if (deposit_type === "usdt") {
      try {
        if (process.env.RPC_URL) {
          const provider = new ethers.providers.JsonRpcProvider(
            process.env.RPC_URL
          );

          const signer = new ethers.Wallet(
            process.env.PRIVATE_KEY ? process.env.PRIVATE_KEY : undefined,
            provider
          );

          const contract = new ethers.Contract(
            process.env.CONTRACT_ADDRESS,
            ABI,
            signer
          );

          // const gasEstimate = await contract.estimateGas.transfer(
          //   wallet_address,
          //   ethers.utils.parseUnits(amount.toString(), "ether"),
          //   { gasLimit: 20000 }
          // );

          // console.log("gasEstimate", gasEstimate);

          const transactionResponse = await contract
            .transfer(
              wallet_address,
              ethers.utils.parseUnits(amount.toString(), "ether"),
              {
                gasLimit: 200000,
              }
            )
            .then((tx) => tx.wait());

          console.log("transactionResponse", transactionResponse);

          // externalSwap[i].amount ? ethers.parseEther(externalSwap[i].amount.toString()) : undefined

          if (transactionResponse.status === 1) {
            const updateExternalSwap = await ExternalSwap.updateOne(
              { _id: externalSwap[i]._id },
              { $set: { status: "Approved", reason: "" } }
            );
          }
          return res.status(200).json({
            status: true,
            message: "ExternalSwap found",
            data: transactionResponse,
          });
        } else {
          return res.status(500).json({
            error: "Internal Server Error",
            message: "RPC_URL not defined",
          });
        }
      } catch (error) {
        console.log("error", error);

        return res.status(500).json({
          error: "Internal Server Error",
          message: error.message,
        });

        const updateExternalSwap = await ExternalSwap.updateOne(
          { _id: externalSwap[i]._id },
          { $set: { status: "failed", reason: error.message } }
        );
      }
    }
  }

  return res.status(200).json({
    status: true,
    message: "ExternalSwap found",
    externalSwap: externalSwap,
  });
}

module.exports = {
  createExternalSwap,
  adminApproval,
  getAllExternalSwap,
  findExternalSwap,
  transferYuva,
};

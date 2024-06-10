const Deposit = require('../models/deposit');
const Coin = require('../models/Coin');
const Member = require('../models/memberModel');
const ConvertHistory = require("../models/converHistoryModel")
const ReferralHistory = require('../models/referralModel');
const { v4: uuidv4 } = require('uuid');
const Joi = require('joi');
const { log } = require('util');
const AdminControl = require('../models/AdminControl.Model')


function generateTransactionId() {
  return uuidv4(); // Using just UUID for simplicity, feel free to customize it further
}

const createDeposit = async (req, res) => {
  try {
    // Define a schema for request body validation
    const schema = Joi.object({
      amount: Joi.number().positive().required(),
      transaction_hash: Joi.string().required(),
      wallet_address: Joi.string().required(),
      deposit_type: Joi.string().valid('usdt', 'bnb', 'matic').required(),
    });

    const { error, value } = schema.validate(req.body);

    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    // Retrieve member information based on member_user_id
    const { member_user_id, member_name, wallet_address, referralCode } = req.user;
    const member = await Member.findOne({ member_user_id });

    if (!member) {
      return res.status(404).json({ error: 'Member not found' });
    }

    // Fetch referral settings from AdminControl
    const acontrol = await AdminControl.findOne({}, {}, { sort: { updatedAt: -1 } }).limit(1);

    // Check if the provided wallet_address matches the member's wallet_address
    // if (wallet_address !== value.wallet_address) {
    //   return res.status(400).json({ error: 'Invalid wallet address' });
    // }

    // Check if the transaction hash already exists
    const existingDeposit = await Deposit.findOne({ transaction_hash: value.transaction_hash });
    if (existingDeposit) {
      return res.status(400).json({ error: 'Transaction hash already exists' });
    }

    // Ensure that amount has maximum 4 decimal places
    const [integer, decimal] = value.amount.toString().split('.');
    if (decimal && decimal.length > 4) {
      return res.status(400).json({ error: 'Amount should have maximum 4 decimal places' });
    }

    // Limit amount to 4 decimal places
    value.amount = decimal ? Number(integer + '.' + decimal.slice(0, 4)) : value.amount;

    // Create a new deposit
    const newDeposit = new Deposit({
      member: member_user_id,
      name: member_name,
      amount: value.amount,
      transaction_hash: value.transaction_hash,
      wallet_address: value.wallet_address,
      deposit_type: value.deposit_type,
    });

    const coinPrices = await Coin.findOne();
    if (!coinPrices) {
      return res.status(400).json({ error: 'Coin value not found' });
    }
    // Update the total deposit for the specific deposit type in the Member schema
    switch (value.deposit_type) {
      case 'usdt':
        member.deposit_usdt += value.amount;
        break;
      // case 'bnb':
      //   member.deposit_bnb += value.amount;
      //   break;
      // case 'matic':
      //   member.deposit_matic += value.amount;
      //   break;
      case 'bnb':
        coinAmount = value.amount / coinPrices.price.bnb;
        member.coins += coinAmount;
        break;
      case 'matic':
        coinAmount = value.amount / coinPrices.price.matic;
        member.coins += coinAmount;
        break;
      default:
        return res.status(400).json({ error: 'Invalid deposit type' });
    }


    // Ensure deposit_usdt has 4 decimal places
    member.deposit_usdt = Number(member.deposit_usdt.toFixed(4));

    // Check if member has referred someone and the referral code is valid
    if (member.deposit_usdt >= acontrol.setMinimumReferralamount && member.referralCode) {
      // Mark member as referred
      member.isReferred = true;
      const referralUserId = await Member.findOne({ referralCode: member.referralCode }, 'member_user_id');
      if (referralUserId) {
        // Find the member who referred this member
        const referralMember = await Member.findOne({ member_user_id: member.referralCode });
        if (referralMember) {
          // Ensure referralMember exists
          // Add referral coins to the referring member's coins
          if (typeof acontrol.setReferralCoinValue === 'number' && !isNaN(acontrol.setReferralCoinValue)) {
            referralMember.coins += acontrol.setReferralCoinValue;
            await referralMember.save();
            // Create a referral history entry
            if (member.isReferred === true) {
              const referralHistory = new ReferralHistory({
                user_id: referralMember.member_user_id,
                user_name: referralMember.member_name,
                user_earned: acontrol.setReferralCoinValue,
                referral_code: member.referralCode,
                referral_user_name: member.member_name,
                referral_user: member.member_user_id,
                referral_user_isRefered: true
              });
              await referralHistory.save();
              
            } else {
              console.error('Invalid setReferralCoinValue:', acontrol.setReferralCoinValue);
            }
          }
        }
      }
    }

    // Save the updated member object to the database
    await member.save();

    // Save the deposit to the database
    const savedDeposit = await newDeposit.save();

    return res.status(201).json(savedDeposit);
  } catch (error) {
    console.error('Error creating deposit:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};


// const createDeposit = async (req, res) => {
//   try {
//     // Define a schema for request body validation
//     const schema = Joi.object({
//       amount: Joi.number().positive().required(),
//       transaction_hash: Joi.string().required(),
//       wallet_address: Joi.string().required(),
//       deposit_type: Joi.string().valid('usdt', 'bnb', 'matic').required(),
//     });

//     const { error, value } = schema.validate(req.body);

//     if (error) {
//       return res.status(400).json({ error: error.details[0].message });
//     }

//     // Retrieve member information based on member_user_id
//     const { member_user_id, member_name, wallet_address } = req.user;
//     const member = await Member.findOne({ member_user_id });

//     if (!member) {
//       return res.status(404).json({ error: 'Member not found' });
//     }

//     const acontrol = await AdminControl.find({});
//     // Check if the provided wallet_address matches the member's wallet_address
//     // if (wallet_address !== value.wallet_address) {
//     //   return res.status(400).json({ error: 'Invalid wallet address' });
//     // }

//     // Check if the transaction hash already exists
//     const existingDeposit = await Deposit.findOne({ transaction_hash: value.transaction_hash });
//     if (existingDeposit) {
//       return res.status(400).json({ error: 'Transaction hash already exists' });
//     }

//     //minimum amount is 50
//     // if (value.amount < 50) {
//     //   return res.status(400).json({ error: 'Minimum deposit amount is 50' });
//     // }


//     // check that amount has only 4 decimal in body
//     const [integer, decimal] = value.amount.toString().split('.');
//     if (decimal && decimal.length > 4) {
//       return res.status(400).json({ error: 'Amount should have maximum 4 decimal places' });
//     }

//     // while adding amount only 4 decimal is allowed
//     value.amount = decimal ? Number(integer + '.' + decimal.slice(0, 4)) : value.amount;

//     // Create a new deposit
//     const newDeposit = new Deposit({
//       member: member_user_id,
//       name: member_name,
//       amount: value.amount,
//       transaction_hash: value.transaction_hash,
//       wallet_address: value.wallet_address,
//       deposit_type: value.deposit_type,
//     });

//     // Update the total deposit for the specific deposit type in the Member schema
//     switch (value.deposit_type) {
//       case 'usdt':
//         member.deposit_usdt += value.amount;
//         break;
//       case 'bnb':
//         member.deposit_bnb += value.amount;
//         break;
//       case 'matic':
//         member.deposit_matic += value.amount;
//         break;
//       default:
//         return res.status(400).json({ error: 'Invalid deposit type' });
//     }

//     // deposit_usdthave 4 decimals
//     member.deposit_usdt = Number(member.deposit_usdt.toFixed(4));


// if (member.deposit_usdt >= 10 && member.referralCode) {
//   member.isReferred = true;
//   const referralUserId = await Member.findOne({ referralCode: member.referralCode }, 'member_user_id');
//   if (referralUserId) {
//     const referralMember = await Member.findOne({ member_user_id: member.referralCode });
//     if (referralMember) {
//       referralMember.coins += 5;
//       await referralMember.save();
//       if (member.isReferred === true) {
//         const referralHistory = new ReferralHistory({
//           user_id: referralMember.member_user_id,
//           user_name: referralMember.member_name,
//           // user_earned: referralMember.coins,
//           user_earned: 5,
//           referral_code: member.referralCode,
//           referral_user_name: member.member_name,
//           referral_user: member.member_user_id,
//           referral_user_isRefered: member.isReferred
//         })
//         await referralHistory.save();
//       }
//     }
//   }
// }

//     // Save the updated member object to the database
//     await member.save();

//     // Save the deposit to the database
//     const savedDeposit = await newDeposit.save();

//     return res.status(201).json(savedDeposit);
//   } catch (error) {
//     console.error('Error creating deposit:', error);
//     return res.status(500).json({ error: 'Internal Server Error' });
//   }
// };





async function getAllDepositsForAdmin(req, res) {
  const Schema = Joi.object({
    page_number: Joi.number(),
    count: Joi.number(),
  });
  const { error, value } = Schema.validate(req.params);

  if (error) {
    return res.status(400).json({ status: false, error: error.details[0].message });
  }

  try {
    const page_number = value.page_number || 1;
    const count = value.count || 10;
    const offset = (page_number - 1) * count;
    const allDepositsTotal = await Deposit.find().sort({ createdAt: -1 })
    const allDeposits = await Deposit.find().sort({ createdAt: -1 })
      .skip(offset)
      .limit(count);

    if (!allDeposits || allDeposits.length === 0) {
      return res.status(200).json({ status: false, message: "No deposit found", allDeposits: [] });
    }

    return res.status(200).json({ status: true, message: "Deposit found", allDeposits: allDeposits, allDepositsTotal: allDepositsTotal.length });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}



async function getDepositsForUser(req, res) {
  const Schema = Joi.object({
    page_number: Joi.number(),
    count: Joi.number(),
  });
  const { error, value } = Schema.validate(req.params);

  if (error) {
    return res.status(400).json({ status: false, error: error.details[0].message });
  }
  const userId = req.user.member_user_id; // Assuming you're passing userId as a route parameter

  try {
    const page_number = value.page_number || 1;
    const count = value.count || 10;
    const offset = (page_number - 1) * count;

    // Retrieve deposits for the specific user
    const userDepositsTotal = await Deposit.find({ member: userId });
    const userDeposits = await Deposit.find({ member: userId }).sort({ createdAt: -1 })
      .skip(offset)
      .limit(count);

    if (!userDeposits || userDeposits.length === 0) {
      return res.status(200).json({ status: false, message: "No deposit found", userDeposits: [] });
    }

    return res.status(200).json({ status: true, message: "Deposit found", userDeposits: userDeposits, userDepositsTotal: userDepositsTotal.length });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function convertDepositToCoins(req, res) {
  const schema = Joi.object({
    deposit_type: Joi.string().valid('usdt', 'bnb', 'matic').required(),
    amount: Joi.number().positive().required(),
  });
  try {
    // Validate the request body
    const { error, value } = schema.validate(req.body);

    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    // Retrieve member information based on member_user_id
    const { member_user_id } = req.user;
    const member = await Member.findOne({ member_user_id });

    if (!member) {
      return res.status(404).json({ error: 'Member not found' });
    }
    const { deposit_type, amount } = value;
    // Check if the member has sufficient deposits to convert
    const depositAmount = member[`deposit_${deposit_type}`];


    if (depositAmount < amount) {
      return res.status(400).json({ error: 'Insufficient deposit amount' });
    }

    // Retrieve the current coin prices
    const coinPrices = await Coin.findOne(); // Assuming there's only one document for coin prices

    // Calculate the equivalent coin amount based on the deposit type
    let coinAmount;
    switch (req.body.deposit_type) {
      case 'usdt':
        coinAmount = req.body.amount / coinPrices.price.usdt;
        break;
      case 'bnb':
        coinAmount = req.body.amount / coinPrices.price.bnb;
        break;
      case 'matic':
        coinAmount = req.body.amount / coinPrices.price.matic;
        break;
    }

    // Update member's coins balance
    member.coins += coinAmount;

    // Update member's deposit balance (subtract the converted amount)
    member[`deposit_${req.body.deposit_type}`] -= req.body.amount;

    // Save the updated member object to the database
    await member.save();

    //if conversion is successful then that data will be saved in ConvertHistory db and i want to show that data that which method is converted to which coin

    const convertHistory = await ConvertHistory.create({
      member: member.member_user_id,
      name: member.member_name,
      wallet_address: member.wallet_address,
      transaction_hash: Deposit.transaction_hash,
      deposit_type: req.body.deposit_type,
      amount: req.body.amount,
      coin_amount: coinAmount
    })

    await convertHistory.save();

    return res.status(200).json({ message: 'Deposit converted to coins successfully', coinAmount, member });
  } catch (error) {
    console.error('Error converting deposit to coins:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function convertHistoryUser(req, res) {
  const Schema = Joi.object({
    page_number: Joi.number(),
    count: Joi.number(),
  });
  const { error, value } = Schema.validate(req.params);

  if (error) {
    return res.status(400).json({ status: false, error: error.details[0].message });
  }

  try {

    const userId = req.user.member_user_id;
    const page_number = value.page_number || 1;
    const count = value.count || 10;
    const offset = (page_number - 1) * count;

    const userDepositsTotal = await ConvertHistory.find({ member: userId });
    const userDeposits = await ConvertHistory.find({ member: userId })
      .sort({ createdAt: -1 })
      .skip(offset)
      .limit(count);


    if (!userDeposits || userDeposits.length === 0) {
      return res.status(200).json({ status: false, message: "No deposit found", userDeposits: [] });
    }

    return res.status(200).json({ status: true, message: "Deposit found", userDeposits: userDeposits, userDepositsTotal: userDepositsTotal.length });

  } catch (error) {
    console.error('Error retrieving user deposits:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function convertHistoryAdmin(req, res) {
  const Schema = Joi.object({
    page_number: Joi.number(),
    count: Joi.number(),
  });
  const { error, value } = Schema.validate(req.params);

  if (error) {
    return res.status(400).json({ status: false, error: error.details[0].message });
  }

  try {
    const page_number = value.page_number || 1;
    const count = value.count || 10;
    const offset = (page_number - 1) * count;

    const userDepositsTotal = await ConvertHistory.find();
    const userDeposits = await ConvertHistory.find()
      .sort({ createdAt: -1 })
      .skip(offset)
      .limit(count);


    if (!userDeposits || userDeposits.length === 0) {
      return res.status(200).json({ status: false, message: "No deposit found", userDeposits: [] });
    }

    return res.status(200).json({ status: true, message: "Deposit found", userDeposits: userDeposits, userDepositsTotal: userDepositsTotal.length });

  } catch (error) {
    console.error('Error retrieving user deposits:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function findMemberDeposit(req, res) {
  try {
    const { name } = req.body
    if (name.length < 3) {
      return res.status(400).json({ status: false, message: "Minimum 3 character required" });
    }
    const member = await Deposit.find({ name: { $regex: name, $options: "i" } });

    if (member.length == 0) {
      return res.status(404).json({ status: false, message: "Member not found" });
    }
    return res.status(200).json({ status: true, message: "Member found", data: member });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: false, message: "Internal server error" });
  }
}
module.exports = {
  createDeposit, getAllDepositsForAdmin, getDepositsForUser, convertDepositToCoins, convertHistoryUser, convertHistoryAdmin, findMemberDeposit
};


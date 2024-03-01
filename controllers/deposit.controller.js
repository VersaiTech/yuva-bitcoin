const Deposit = require('../models/deposit');
const Coin = require('../models/Coin');
const Member = require('../models/memberModel');
const { v4: uuidv4 } = require('uuid');


function generateTransactionId() {
  return uuidv4(); // Using just UUID for simplicity, feel free to customize it further
}

//==================================================================================================================

async function createDeposit(req, res) {
  try {
    // Retrieve member information based on member_user_id
    const { member_user_id, member_name } = req.user;
    const member = await Member.findOne({ member_user_id });

    if (!member) {
      return res.status(404).json({ error: 'Member not found' });
    }

    // Create a new deposit
    const newDeposit = new Deposit({
      member: member_user_id,
      name: member_name,
      amount: req.body.amount,
      transaction_hash: req.body.transaction_hash,
      wallet_address: req.body.wallet_address,
      deposit_type: req.body.deposit_type,
    });

    // Update the total deposit for the specific deposit type in the Member schema
    switch (req.body.deposit_type) {
      case 'usdt':
        member.deposit_usdt += req.body.amount;
        break;
      case 'btc':
        member.deposit_btc += req.body.amount;
        break;
      case 'ethereum':
        member.deposit_ethereum += req.body.amount;
        break;
      default:
        return res.status(400).json({ error: 'Invalid deposit type' });
    }

    // Save the updated member object to the database
    await member.save();

    // Save the deposit to the database
    const savedDeposit = await newDeposit.save();

    res.status(201).json(savedDeposit);
  } catch (error) {
    console.error('Error creating deposit:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}



async function getAllDepositsForAdmin(req, res) {
  try {
    // Retrieve all deposits
    const allDeposits = await Deposit.find();

    res.status(200).json(allDeposits);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}



async function getDepositsForUser(req, res) {
  const userId = req.user.member_user_id; // Assuming you're passing userId as a route parameter
  
  try {
    // Retrieve deposits for the specific user
    const userDeposits = await Deposit.find({ member: userId });
    console.log('User Deposits:', userDeposits);

    res.status(200).json(userDeposits);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function convertDepositToCoins(req, res) {
  try {
    // Retrieve member information based on member_user_id
    const { member_user_id } = req.user;
    const member = await Member.findOne({ member_user_id });

    if (!member) {
      return res.status(404).json({ error: 'Member not found' });
    }

    // Check if the member has sufficient deposits to convert
    if (
      req.body.deposit_type !== 'usdt' &&
      req.body.deposit_type !== 'btc' &&
      req.body.deposit_type !== 'ethereum'
    ) {
      return res.status(400).json({ error: 'Invalid deposit type' });
    }

    const depositAmount = member[`deposit_${req.body.deposit_type}`];

    if (depositAmount < req.body.amount) {
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
      case 'btc':
        coinAmount = req.body.amount / coinPrices.price.btc;
        break;
      case 'ethereum':
        coinAmount = req.body.amount / coinPrices.price.ethereum;
        break;
    }

    // Update member's coins balance
    member.coins += coinAmount;

    // Update member's deposit balance (subtract the converted amount)
    member[`deposit_${req.body.deposit_type}`] -= req.body.amount;

    // Save the updated member object to the database
    await member.save();

    res.status(200).json({ message: 'Deposit converted to coins successfully', coinAmount, member });
  } catch (error) {
    console.error('Error converting deposit to coins:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}



module.exports = {
  createDeposit, getAllDepositsForAdmin, getDepositsForUser, convertDepositToCoins
};





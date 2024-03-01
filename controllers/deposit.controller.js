const Deposit = require('../models/deposit');
const Coin = require('../models/Coin');
const Member = require('../models/memberModel');
const { v4: uuidv4 } = require('uuid');


function generateTransactionId() {
  return uuidv4(); // Using just UUID for simplicity, feel free to customize it further
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
      member: member_user_id, // Use member's ObjectId (_id) instead of member_user_id
      name: member_name,
      amount: req.body.amount,
      transaction_hash: req.body.transaction_hash,
      wallet_address: req.body.wallet_address,
      deposit_type: req.body.deposit_type,
    });

    // Save the deposit to the database
    const savedDeposit = await newDeposit.save();

    res.status(201).json(savedDeposit);
  } catch (error) {
    console.error('Error creating deposit:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}


async function getDepositsForUser(req, res) {
  const userId = req.user.member_user_id; // Assuming you're passing userId as a route parameter

  try {
    // Retrieve deposits for the specific user
    const userDeposits = await Deposit.find({ member_user_id: userId });

    res.status(200).json(userDeposits);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

const convertDepositToCoins = async (req, res) => {
  const memberId = req.user.member_user_id; // Assuming you have user information in the request
  try {
    // Fetch the latest coin value
    const coin = await Coin.findOne();

    if (!coin) {
      return res.status(500).json({ error: 'Coin information not available' });
    }

    // Fetch the deposit details
    const deposit = await Deposit.find(req.params.depositId);

    if (!deposit || deposit.member_user_id !== memberId) {
      return res.status(404).json({ error: 'Deposit not found for the member' });
    }

    // Calculate the equivalent coins based on the deposit amount and coin value
    const equivalentCoins = deposit.amount / coin.inr;

    // Update the member's coins
    const member = await Member.findOne({ member_user_id: memberId });

    if (!member) {
      return res.status(500).json({ error: 'Member not found' });
    }

    member.coins += equivalentCoins;
    await member.save();

    // You may want to update the deposit status or perform other actions here

    res.json({ message: 'Deposit converted to coins successfully', equivalentCoins, member });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};



module.exports = {
  createDeposit, getAllDepositsForAdmin, getDepositsForUser, convertDepositToCoins
};





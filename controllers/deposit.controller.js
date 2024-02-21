const Deposit = require('../models/deposit');
const Member = require('../models/memberModel');
const { v4: uuidv4 } = require('uuid');


function generateTransactionId() {
    return uuidv4(); // Using just UUID for simplicity, feel free to customize it further
  }
  
  async function createDeposit(req, res) {
    try {
      // Retrieve member information based on member_user_id
      const { member_user_id } = req.user;
      const member = await Member.findOne({ member_user_id });
  
      if (!member) {
        return res.status(404).json({ error: 'Member not found' });
      }
  
      // Generate a unique transaction_id
      const transaction_id = generateTransactionId();
  
      // Create a new deposit
      const newDeposit = new Deposit({
        member_user_id,
        member_name: member.member_name,
        transaction_id,
        ...req.body,
      });
  
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
        const userDeposits = await Deposit.find({ member_user_id: userId });

        res.status(200).json(userDeposits);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}



module.exports = {
    createDeposit, getAllDepositsForAdmin, getDepositsForUser,
};





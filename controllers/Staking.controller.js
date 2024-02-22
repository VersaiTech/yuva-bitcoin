// const connection = require("../config/db.config");
// const { promisify } = require("util");
// const query = promisify(connection.query).bind(connection);

// const getStakingData = async (req, res) => {
//   const query1 = `SELECT * FROM tbl_adminChangeWallet where Status='0'`;
//   const output = await query(query1);
//   if (output.length === 0) {
//     return res.status(400).send({
//       message: "No wallet is currently available for staking",
//     });
//   } else {
//     const user = output[0];
//     return res.status(200).send({
//       message: "Wallet is available for staking",
//       wallet: user.walletAddress,
//     });
//   }
// };

// const stakingRequest = async (req, res) => {
//   const user = req.user;

//   //Get Member Name
//   const query1 = `SELECT * FROM tbl_memberreg WHERE member_user_id='${user}'`;
//   let output = await query(query1);
//   if (output.length === 0) {
//     return res.status(400).send({
//       message: "Invalid user id",
//     });
//   }
//   const member_name = output[0].member_name;

//   const currentDate = new Date();

//   const options = {
//     year: "numeric",
//     month: "2-digit",
//     day: "2-digit",
//     timeZone: "Asia/Kolkata",
//   };

//   let sys_date = currentDate
//     .toLocaleString("en-IN", options)
//     .replace(",", "")
//     .replaceAll("/", "-");

//   const arr = sys_date.split("-");
//   sys_date = `${arr[2]}-${arr[1]}-${arr[0]}`;

//   const option = {
//     hour: "2-digit",
//     minute: "2-digit",
//     second: "2-digit",
//     hour12: false,
//     timeZone: "Asia/Kolkata",
//   };

//   const time = currentDate.toLocaleString("en-IN", option);

//   sys_date = `${sys_date} ${time}`;

//   console.log(sys_date);

//   const { wallerAddress, amount, transactionHash } = req.body;
//   const query2 = `INSERT INTO tbl_stake (member_user_id , member_name , sys_date , investment , transaction_id , walletAddress, stake_type) VALUES ('${user}' , '${member_name}' , '${sys_date}' , '${amount}' , '${transactionHash}' , '${wallerAddress}'  , 'Wallet')`;

//   try {
//     const insertStake = await query(query2);
//   } catch (err) {
//     console.log(`error`, err);
//     return res.status(400).send({
//       message: "Error while inserting data",
//     });
//   }

//   return res.status(200).send({
//     message: "Staking request submitted successfully",
//   });
// };

// const stakingSummary = async (req, res) => {
//   const user = req.user;
//   const query1 = `SELECT * FROM tbl_stake WHERE member_user_id='${user}'`;
//   try {
//     const output = await query(query1);
//     return res.status(200).send({
//       message: "Staking summary",
//       data: output,
//     });
//   } catch (err) {
//     console.log(`error`, err);
//     return res.status(400).send({
//       message: "Error while fetching data",
//     });
//   }
// };

// module.exports = {
//   getStakingData,
//   stakingRequest,
//   stakingSummary,
// };


const Member = require('../models/memberModel');
const { v4: uuidv4 } = require('uuid');
const Stake = require("../models/stake");


const stakingSummary = async (req, res) => {
  const userId = req.user.member_user_id;

  try {
    const stakes = await Stake.find({ member_user_id: userId });
    return res.status(200).send({
      message: "Staking summary",
      data: stakes,
    });
  } catch (error) {
    console.error("Error retrieving staking summary:", error);
    return res.status(500).send({
      message: "Internal Server Error",
    });
  }
};


async function transferToStaking(req, res) {
  const userId = req.user.member_user_id;
  try {
    const { investment, stakingDuration } = req.body;

    // Check if the member exists
    const member = await Member.findOne({ member_user_id: userId });
    if (!member) {
      return res.status(404).json({ error: 'Member not found' });
    }
    console.log(member);

    // Check if the member has sufficient balance in the wallet
    if (member.coins < investment) {
      return res.status(400).json({ error: 'Insufficient balance in the wallet' });
    }

    // Deduct the amount from the member's wallet
    member.coins -= investment;
    await member.save();

    // Check if there is an existing stake for the member
    const existingStake = await Stake.findOne({ member_user_id: userId, stake_type: 'Wallet' });

    if (existingStake) {
      // Update the existing Stake
      existingStake.investment += investment;
      await existingStake.save();
      res.status(200).json(existingStake);
    } else {
      // Create a new Stake if none exists
      const newStake = new Stake({
        member_user_id:member.member_user_id,
        member_name: member.member_name,
        investment,
        transaction_id: generateTransactionId(),
        stake_type: 'Wallet',
        stakingDuration,
      });

      // Save the Stake
      const savedStake = await newStake.save();

      res.status(201).json(savedStake);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

function generateTransactionId() {
  return `${Date.now()}_${uuidv4()}`;
}

async function transferToWallet(req, res) {
  const userId = req.user.member_user_id;
  try {
    const { amount } = req.body;

    // Check if the member exists
    const member = await Member.findOne({ member_user_id: userId });
    if (!member) {
      return res.status(404).json({ error: 'Member not found' });
    }

    // Check if there is an existing staking for the member
    const existingStake = await Stake.findOne({ member_user_id: userId, stake_type: 'Wallet' });

    if (!existingStake) {
      return res.status(400).json({ error: 'No staking found for the member' });
    }

    // Check if the staking has enough funds
    if (existingStake.investment < amount) {
      return res.status(400).json({ error: 'Insufficient funds in the staking' });
    }

    // Add the amount to the member's wallet
    member.coins += amount;
    await member.save();

    // Deduct the amount from the staking
    existingStake.investment -= amount;
    await existingStake.save();

    res.status(200).json(existingStake);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}


module.exports = {
  stakingSummary, 
  transferToStaking,
  transferToWallet
};



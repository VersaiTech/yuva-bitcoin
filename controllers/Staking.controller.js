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
//   const query2 = `INSERT INTO tbl_deposit (member_user_id , member_name , sys_date , investment , transaction_id , walletAddress, deposit_type) VALUES ('${user}' , '${member_name}' , '${sys_date}' , '${amount}' , '${transactionHash}' , '${wallerAddress}'  , 'Wallet')`;

//   try {
//     const insertDeposit = await query(query2);
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
//   const query1 = `SELECT * FROM tbl_deposit WHERE member_user_id='${user}'`;
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
const Deposit = require("../models/deposit");

const getStakingData = async (req, res) => {
  try {
    const deposits = await Deposit.find({ Status: '0' });
    if (deposits.length === 0) {
      return res.status(400).send({
        message: "No wallet is currently available for staking",
      });
    } else {
      const user = deposits[0];
      return res.status(200).send({
        message: "Wallet is available for staking",
        wallet: user.walletAddress,
      });
    }
  } catch (error) {
    console.error("Error retrieving staking data:", error);
    return res.status(500).send({
      message: "Internal Server Error",
    });
  }
};

const stakingRequest = async (req, res) => {
  const user = req.user;

  try {
    const deposit = new Deposit({
      member_user_id: user,
      member_name: req.body.member_name,
      sys_date: new Date(),
      investment: req.body.amount,
      transaction_id: req.body.transactionHash,
      walletAddress: req.body.wallerAddress,
      deposit_type: 'Wallet',
    });

    await deposit.save();

    return res.status(200).send({
      message: "Staking request submitted successfully",
    });
  } catch (error) {
    console.error("Error submitting staking request:", error);
    return res.status(500).send({
      message: "Internal Server Error",
    });
  }
};

const stakingSummary = async (req, res) => {
  const userId = req.user.member_user_id;

  try {
    const deposits = await Deposit.find({ member_user_id: userId });
    return res.status(200).send({
      message: "Staking summary",
      data: deposits,
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

    // Check if there is an existing deposit for the member
    const existingDeposit = await Deposit.findOne({ member_user_id: userId, deposit_type: 'Wallet' });

    if (existingDeposit) {
      // Update the existing deposit
      existingDeposit.investment += investment;
      await existingDeposit.save();
      res.status(200).json(existingDeposit);
    } else {
      // Create a new deposit if none exists
      const newDeposit = new Deposit({
        member_user_id:member.member_user_id,
        member_name: member.member_name,
        investment,
        transaction_id: generateTransactionId(),
        deposit_type: 'Wallet',
        stakingDuration,
      });

      // Save the deposit
      const savedDeposit = await newDeposit.save();

      res.status(201).json(savedDeposit);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}


// async function transferToStaking(req, res) {
//   const userId = req.user.member_user_id;
//   try {
//     const { investment, stakingDuration } = req.body;

//     // Define interest rates for different staking durations
//     const interestRates = {
//       3: 0.03, // 3% for 3 months
//       6: 0.05, // 5% for 6 months
//       12: 0.10, // 10% for 12 months
//     };

//     // Check if the member exists
//     const member = await Member.findOne({ member_user_id: userId });
//     if (!member) {
//       return res.status(404).json({ error: 'Member not found' });
//     }

//     // Check if the member has sufficient balance in the wallet
//     if (member.coins < investment) {
//       return res.status(400).json({ error: 'Insufficient balance in the wallet' });
//     }

//     // Calculate interest based on staking duration
//     const interestRate = interestRates[stakingDuration] || 0; // Default to 0 if staking duration not found
//     const interestAmount = investment * interestRate;

//     // Deduct the total amount (investment) from the member's wallet
//     member.coins -= investment;
//     await member.save();

//     // Check if there is an existing deposit for the member
//     const existingDeposit = await Deposit.findOne({ member_user_id: userId, deposit_type: 'Staking' });

//     if (existingDeposit) {
//       // Update the existing deposit
//       existingDeposit.investment += investment;
//       existingDeposit.interest += interestAmount;
//       await existingDeposit.save();
//       res.status(200).json(existingDeposit);
//     } else {
//       // Create a new deposit if none exists
//       const newDeposit = new Deposit({
//         member_user_id: member.member_user_id,
//         member_name: member.member_name,
//         investment: investment,
//         interest: interestAmount,
//         transaction_id: generateTransactionId(),
//         deposit_type: 'Wallet',
//         stakingDuration,
//       });

//       // Save the deposit
//       const savedDeposit = await newDeposit.save();

//       res.status(201).json(savedDeposit);
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// }


// Helper function to generate a unique transaction ID (you may need to implement your logic here)
function generateTransactionId() {
  return `${Date.now()}_${uuidv4()}`;
}

module.exports = {
  getStakingData,
  stakingRequest,
  stakingSummary, transferToStaking
};




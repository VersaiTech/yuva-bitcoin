// controllers/withdrawController.js
const Withdraw = require('../models/withdrawModel');
const Member = require('../models/memberModel');
const Coin = require('../models/Coin');
const Joi = require('joi');

const withdrawRequest = async (req, res) => {
  // Define a schema for request body validation
  const schema = Joi.object({
    amount: Joi.number().positive().required()
  });


  try {
    const { member_user_id } = req.user;
    // Validate the request body
    const { error, value } = schema.validate(req.body);

    if (error) {
      return res.status(400).json({ status: false, message: error.details[0].message });
    }

    const { amount } = value;
    // Check if the member exists
    const member = await Member.findOne({ member_user_id });
    if (!member) {
      return res.status(400).json({
        status: false,
        message: 'No user found',
      });
    }

    // Check if the withdrawal amount is greater than the available amount in the member's schema
    if (amount > member.coins) {
      return res.status(400).json({
        status: false,
        message: 'Withdrawal amount exceeds available balance',
      });
    }

    // Generate a unique reference ID
    const ref_id = generateReferenceID();

    // Create a new withdrawal request
    const withdrawal = new Withdraw({
      member_user_id,
      member_name: member.member_name,
      wallet_address: member.wallet_address,
      with_amt: amount,
      with_referrance: ref_id,
      status: 'Pending', // Set the initial status to 'Pending'
    });

    // Save the withdrawal request
    await withdrawal.save();

    return res.status(200).json({
      status: true,
      message: 'Withdrawal request sent',
      data: withdrawal,
    });
  } catch (err) {
    console.error('Error:', err);
    return res.status(500).json({
      status: false,
      message: 'Internal Server Error',
    });
  }
};


async function getWithdrawByUserId(req, res) {
  try {
    // Extract member_user_id from request parameters
    const { with_referrance } = req.params;

    // Fetch the member from the database based on member_user_id
    const withdraw = await Withdraw.findOne({ with_referrance: with_referrance });

    // If the member is not found, return a 404 response
    if (!withdraw) {
      return res.status(404).json({
        status: false,
        message: `Member with user_id ${with_referrance} not found`,
        member: null,
      });
    }

    // Return the found member
    return res.status(200).json({
      status: true,
      message: `Member found with member_user_id ${with_referrance}`,
      withdraw: withdraw,
    });
  } catch (error) {
    console.error("Error fetching member:", error);
    return res.status(500).json({
      status: false,
      message: "Internal server error",
    });
  }
}


// Controller to update the status of a withdrawal request
// const updateWithdrawalStatus = async (req, res) => {
//   try {
//     const { with_referrance } = req.params;
//     const { status, processed_by, remarks } = req.body;

//     // Find the withdrawal request by reference ID
//     const withdrawal = await Withdraw.findOne({ with_referrance });

//     if (!withdrawal) {
//       return res.status(404).json({ error: 'Withdrawal request not found' });
//     }

//     // Check if the withdrawal request has already been processed
//     if (withdrawal.status !== 'Pending') {
//       return res.status(400).json({ error: `Withdrawal request has already been ${withdrawal.status.toLowerCase()}` });
//     }

//     // Update the withdrawal request status and other details
//     withdrawal.status = status;
//     withdrawal.processing_date = new Date().toISOString(); // Set the current date and time as the processing_date;
//     withdrawal.processed_by = processed_by;
//     withdrawal.remarks = remarks;

//     // Check if the status is "Approved" before deducting from member coins
//     if (status === 'Approved') {
//       // Find the member associated with the withdrawal request
//       const member = await Member.findOne({ member_user_id: withdrawal.member_user_id });

//       if (!member) {
//         return res.status(404).json({ error: 'Member not found' });
//       }

//       // Deduct the withdrawal amount from the member's coin balance
//       member.coins -= withdrawal.with_amt;
//       await member.save();
//     }

//     // Save the updated withdrawal request
//     const updatedWithdrawal = await withdrawal.save();

//     res.status(200).json(updatedWithdrawal);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// };


//==============above is working======================================
//======================below is testing code =============================
// const updateWithdrawalStatus = async (req, res) => {
//   try {
//     const { with_referrance } = req.params;
//     const { status, processed_by, remarks, conversion_type } = req.body;

//     // Find the withdrawal request by reference ID
//     const withdrawal = await Withdraw.findOne({ with_referrance });

//     if (!withdrawal) {
//       return res.status(404).json({ error: 'Withdrawal request not found' });
//     }

//     // Check if the withdrawal request has already been processed
//     if (withdrawal.status !== 'Pending') {
//       return res.status(400).json({ error: `Withdrawal request has already been ${withdrawal.status.toLowerCase()}` });
//     }

//     // Update the withdrawal request status and other details
//     withdrawal.status = status;
//     withdrawal.conversion_type = conversion_type;
//     withdrawal.processing_date = new Date().toISOString(); // Set the current date and time as the processing_date;
//     withdrawal.processed_by = processed_by;
//     withdrawal.remarks = remarks;

//     // Check if the status is "Approved" before deducting from member coins
//     if (status === 'Approved') {
//       // Fetch the Member model using member_user_id
//       const member = await Member.findOne({ member_user_id: withdrawal.member_user_id });

//       if (!member) {
//         return res.status(404).json({ error: 'Member not found' });
//       }

//       // Retrieve the current coin prices
//       const coinPrices = await Coin.findOne(); // Assuming there's only one document for coin prices

//       // Convert the withdrawal amount to the specified crypto (default to usdt)
//       let convertedAmount;
//       switch (withdrawal.conversion_type || 'usdt') {
//         case 'usdt':
//           convertedAmount = withdrawal.with_amt / coinPrices.price.usdt;
//           member.coins_usdt -= withdrawal.with_amt; // Deduct from usdt balance
//           break;
//         case 'btc':
//           convertedAmount = withdrawal.with_amt / coinPrices.price.btc;
//           member.coins_btc -= withdrawal.with_amt; // Deduct from btc balance
//           break;
//         case 'ethereum':
//           convertedAmount = withdrawal.with_amt / coinPrices.price.ethereum;
//           member.coins_ethereum -= withdrawal.with_amt; // Deduct from ethereum balance
//           break;
//         default:
//           return res.status(400).json({ error: 'Invalid conversion type' });
//       }

//       // Save the converted amount details to the Withdraw schema
//       withdrawal.converted_amount = convertedAmount;
//       withdrawal.conversion_date = new Date();
//       withdrawal.withdrawal_referrance = withdrawal.with_referrance;

//       // Save the updated withdrawal object to the database
//       await withdrawal.save();

//       // Save the updated member object to the database
//       await member.save();
//     }

//     res.status(200).json(withdrawal);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// };


const updateWithdrawalStatus = async (req, res) => {
  // Define a schema for request body validation
  const schema = Joi.object({
    status: Joi.string().valid('Approved', 'Rejected').required(),
    processed_by: Joi.string().required(),
    remarks: Joi.string().allow('').optional(),
    conversion_type: Joi.string().valid('usdt', 'btc', 'ethereum').optional(),
    transection_hash: Joi.string().allow('').optional()
  });
  try {
    const { with_referrance } = req.params;
    const { status, processed_by, remarks, conversion_type, transection_hash } = req.body;

    // Validate the request body
    const { error, value } = schema.validate(req.body);

    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    // Find the withdrawal request by reference ID
    const withdrawal = await Withdraw.findOne({ with_referrance });

    if (!withdrawal) {
      return res.status(404).json({ error: 'Withdrawal request not found' });
    }

    // Check if the withdrawal request has already been processed
    if (withdrawal.status !== 'Pending') {
      return res.status(400).json({ error: `Withdrawal request has already been ${withdrawal.status.toLowerCase()}` });
    }

    // Update the withdrawal request status and other details
    withdrawal.status = status;
    withdrawal.conversion_type = conversion_type;
    withdrawal.processing_date = new Date().toISOString(); // Set the current date and time as the processing_date;
    withdrawal.processed_by = processed_by;
    withdrawal.transection_hash = transection_hash;
    withdrawal.remarks = remarks;

    // Check if the status is "Approved" before deducting from member coins
    if (status === 'Approved') {
      // Fetch the Member model using member_user_id
      const member = await Member.findOne({ member_user_id: withdrawal.member_user_id });

      if (!member) {
        return res.status(404).json({ error: 'Member not found' });
      }

      // Retrieve the current coin prices
      const coinPrices = await Coin.findOne(); // Assuming there's only one document for coin prices

      // Convert the withdrawal amount to the specified crypto (default to usdt)
      let convertedAmount;
      switch (withdrawal.conversion_type || 'usdt') {
        case 'usdt':
          convertedAmount = withdrawal.with_amt / coinPrices.price.usdt;
          member.coins_usdt -= withdrawal.with_amt; // Deduct from usdt balance
          break;
        case 'btc':
          convertedAmount = withdrawal.with_amt / coinPrices.price.btc;
          member.coins_btc -= withdrawal.with_amt; // Deduct from btc balance
          break;
        case 'ethereum':
          convertedAmount = withdrawal.with_amt / coinPrices.price.ethereum;
          member.coins_ethereum -= withdrawal.with_amt; // Deduct from ethereum balance
          break;
        default:
          return res.status(400).json({ error: 'Invalid conversion type' });
      }

      // Save the converted amount details to the Withdraw schema
      withdrawal.converted_amount = convertedAmount;
      withdrawal.conversion_date = new Date();
      withdrawal.withdrawal_referrance = withdrawal.with_referrance;

      // Deduct the withdrawal amount from the member's coin balance
      member.coins -= withdrawal.with_amt;

      // Save the updated withdrawal object to the database
      await withdrawal.save();

      // Save the updated member object to the database
      await member.save();
    } else {
      // If the status is not "Approved", don't deduct from member's coins
      await withdrawal.save();
    }

    res.status(200).json(withdrawal);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};







const getWithdrawRequests = async (req, res) => {
  // const { member_user_id } = req.user;
  const Schema = Joi.object({
    page_number: Joi.number(),
    count: Joi.number(),
  });

  const { error, value } = Schema.validate(req.params);

  if (error) {
    return res.status(400).json({ status: false, error: error.details[0].message });
  }
  try {
    // Fetch withdrawal requests for the current member
    // status 0 for pending
    const page_number = value.page_number || 1;
    const count = value.count || 10;
    const offset = (page_number - 1) * count;

    const withdrawRequests = await Withdraw.find()
      .sort({ createdAt: -1 })
      .skip(offset)
      .limit(count);

    // Total number of withdrawal requests
    const totalWithdrawRequests = await Withdraw.countDocuments();

    if (!withdrawRequests || withdrawRequests.length === 0) {
      return res.status(200).json({
        status: false,
        message: 'No withdrawal requests',
        totalWithdrawRequests: totalWithdrawRequests,
        withdrawRequest: []
      });
    }

    return res.status(200).json({
      status: true,
      message: 'Withdrawal requests',
      totalWithdrawRequests: totalWithdrawRequests,
      data: withdrawRequests,
    });

  } catch (err) {
    console.error('Error:', err);
    return res.status(500).json({
      status: false,
      message: 'Internal Server Error',
    });
  }
};

const getWithdrawPending = async (req, res) => {
  // const { member_user_id } = req.user;
  const Schema = Joi.object({
    page_number: Joi.number(),
    count: Joi.number(),
  });

  const { error, value } = Schema.validate(req.params);

  if (error) {
    return res.status(400).json({ status: false, error: error.details[0].message });
  }
  try {
    // Fetch withdrawal requests for the current member
    // status 0 for pending
    const page_number = value.page_number || 1;
    const count = value.count || 10;
    const offset = (page_number - 1) * count;

    const withdrawRequests = await Withdraw.find({ status: 'Pending' })
      .sort({ createdAt: -1 })
      .skip(offset)
      .limit(count);
    // Total number of pending withdrawal requests
    const totalPendingWithdrawRequests = await Withdraw.countDocuments({ status: 'Pending' });

    if (!withdrawRequests || withdrawRequests.length === 0) {
      return res.status(400).json({
        status: false,
        message: 'No withdrawal pending',
        totalPendingWithdrawRequests: totalPendingWithdrawRequests,
        withdrawRequest: [],
      });
    }
    return res.status(200).json({
      status: true,
      message: 'Withdrawal Pending : ',
      totalPendingWithdrawRequests: totalPendingWithdrawRequests,
      data: withdrawRequests,
    });

  } catch (err) {
    console.error('Error:', err);
    return res.status(500).json({
      status: false,
      message: 'Internal Server Error',
    });
  }
};

const getWithdrawApproved = async (req, res) => {
  // const { member_user_id } = req.user;
  const Schema = Joi.object({
    page_number: Joi.number(),
    count: Joi.number(),
  });

  const { error, value } = Schema.validate(req.params);

  if (error) {
    return res.status(400).json({ status: false, error: error.details[0].message });
  }

  try {
    // Fetch withdrawal requests for the current member
    // status 0 for pending
    const page_number = value.page_number || 1;
    const count = value.count || 10;
    const offset = (page_number - 1) * count;

    const withdrawRequests = await Withdraw.find({ status: 'Approved' })
      .sort({ createdAt: -1 })
      .skip(offset)
      .limit(count);
    const totalApprovedWithdrawRequests = await Withdraw.countDocuments({ status: 'Approved' });

    if (!withdrawRequests || withdrawRequests.length === 0) {
      return res.status(400).json({
        status: false,
        message: 'No withdrawal Approved',
        totalApprovedWithdrawRequests: totalApprovedWithdrawRequests,
        withdrawRequests: []
      });
    }
    return res.status(200).json({
      status: true,
      message: 'Withdrawal Approved : ',
      totalApprovedWithdrawRequests: totalApprovedWithdrawRequests,
      data: withdrawRequests,
    });

  } catch (err) {
    console.error('Error:', err);
    return res.status(500).json({
      status: false,
      message: 'Internal Server Error',
    });
  }
};


const getWithdrawRejected = async (req, res) => {
  // const { member_user_id } = req.user;
  const Schema = Joi.object({
    page_number: Joi.number(),
    count: Joi.number(),
  });

  const { error, value } = Schema.validate(req.params);

  if (error) {
    return res.status(400).json({ status: false, error: error.details[0].message });
  }
  try {
    // Fetch withdrawal requests for the current member
    // status 0 for pending
    const page_number = value.page_number || 1;
    const count = value.count || 10;
    const offset = (page_number - 1) * count;

    const withdrawRequests = await Withdraw.find({ status: 'Rejected' })
      .sort({ createdAt: -1 })
      .skip(offset)
      .limit(count);

    const totalRejectedWithdrawRequests = await Withdraw.countDocuments({ status: 'Rejected' });
    if (!withdrawRequests || withdrawRequests.length === 0) {
      return res.status(400).json({
        status: false,
        message: 'No withdrawal Rejected',
        totalRejectedWithdrawRequests: totalRejectedWithdrawRequests,
        withdrawRequests: []
      });
    }
    return res.status(200).json({
      status: true,
      message: 'Withdrawal rejected :',
      totalRejectedWithdrawRequests: totalRejectedWithdrawRequests,
      data: withdrawRequests,
    });

  } catch (err) {
    console.error('Error:', err);
    return res.status(500).json({
      status: false,
      message: 'Internal Server Error',
    });
  }
};

const getUserWithdraws = async (req, res) => {
  const Schema = Joi.object({
    page_number: Joi.number(),
    count: Joi.number(),
  });

  const { error, value } = Schema.validate(req.params);

  if (error) {
    return res.status(400).json({ status: false, error: error.details[0].message });
  }
  const { member_user_id } = req.user;

  try {
    const page_number = value.page_number || 1;
    const count = value.count || 10;
    const offset = (page_number - 1) * count;
    // Fetch withdrawal requests for the current member
    const withdrawRequests = await Withdraw.find({ member_user_id })
      .sort({ createdAt: -1 })
      .skip(offset)
      .limit(count);

    const totalUserWithdrawRequests = await Withdraw.countDocuments({ member_user_id });
    if (!withdrawRequests || withdrawRequests.length === 0) {
      return res.status(400).json({
        status: false,
        message: 'No User withdrawal requests',
        totalUserWithdrawRequests: totalUserWithdrawRequests,
        withdrawRequests: []
      });
    }
    return res.status(200).json({
      status: true,
      message: 'Withdrawal requests',
      totalUserWithdrawRequests: totalUserWithdrawRequests,
      data: withdrawRequests,
    });

  } catch (err) {
    console.error('Error:', err);
    return res.status(500).json({
      status: false,
      message: 'Internal Server Error',
    });
  }
};


// Helper function to generate a reference ID
const generateReferenceID = () => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let ref_id = '';
  const charactersLength = characters.length;
  for (let i = 0; i < 20; i++) {
    ref_id += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return ref_id;
};

module.exports = {
  withdrawRequest,
  updateWithdrawalStatus,
  getWithdrawRequests,
  getWithdrawApproved,
  getWithdrawRejected,
  getWithdrawPending,
  getUserWithdraws,
  getWithdrawByUserId
};

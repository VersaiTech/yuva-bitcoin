// const connection = require("../config/db.config");

// const { promisify } = require("util");
// const query = promisify(connection.query).bind(connection);

// const withdrawRequest = async (req, res) => {
//   const member_user_id = req.user;
//   const { amount } = req.body;

//   // Date
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

//   const query1 = `SELECT * FROM tbl_memberreg WHERE member_user_id='${member_user_id}'`;
//   try {
//     const output = await query(query1);
//     console.log(`output`, output);
//     if (output.length === 0) {
//       return res.status(400).send({
//         status: false,
//         message: "No user",
//       });
//     } else {
//       let member_name = output[0].member_name;

//       //Generate Reference ID with unique string of 20 characters with capital alphabets and numbers
//         let ref_id = "";
//         const characters =
//             "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
//         const charactersLength = characters.length;
//         for (let i = 0; i < 20; i++) {
//             ref_id += characters.charAt(
//                 Math.floor(Math.random() * charactersLength)
//             );
//         }
//         console.log(`ref_id`, ref_id);

//         //Check if reference id already exists
//         const query3 = `SELECT * FROM tbl_withdraw WHERE with_referrance='${ref_id}'`;
//         let output3 = await query(query3);
//         while(output3.length > 0){
//             ref_id = "";
//             for (let i = 0; i < 20; i++) {
//                 ref_id += characters.charAt(
//                     Math.floor(Math.random() * charactersLength)
//                 );
//             }
//             output3 = await query(query3);
//         }
//         console.log(`ref_id`, ref_id);



//       //   const query2 = `INSERT INTO tbl_withdraw(member_user_id, member_name ,amount , with_date) VALUES('${member_user_id}', '${member_name}' , '${amount}' , '${sys_date}'`;
//       const query2 = `INSERT INTO tbl_withdraw(member_user_id, member_name ,with_amt , with_date , with_referrance) VALUES('${member_user_id}', '${member_name}' , '${amount}' , '${sys_date}' , '${ref_id}')`;
//       try {
//         const output2 = await query(query2);
//         console.log(`output2`, output2);
//         return res.status(200).send({
//           status: true,
//           message: "Withdraw request sent",
//         });
//       } catch (err) {
//         console.log(`error`, err);
//         return res.status(500).send({
//           status: false,
//           message: "Internal Server Error",
//         });
//       }
//     }
//   } catch (err) {
//     console.log(`error`, err);
//     return res.status(500).send({
//       status: false,
//       message: "Internal Server Error",
//     });
//   }
// };

// const getWithdrawRequests = async (req, res) => {
//   const user = req.user;
//   const query1 = `SELECT * FROM tbl_withdraw WHERE member_user_id=${user}`;
//   console.log(`query1`, query1);
//   try {
//     const output = await query(query1);
//     console.log(`output`, output);
//     if (output.length === 0) {
//       return res.status(400).send({
//         status: false,
//         message: "No withdraw requests",
//       });
//     } else {
//       return res.status(200).send({
//         status: true,
//         message: "Withdraw requests",
//         data: output,
//       });
//     }
//   } catch (err) {
//     return res.status(500).send({
//       status: false,
//       message: "Internal Server Error",
//     });
//   }
// };

// module.exports = {
//   withdrawRequest,
//   getWithdrawRequests,
// };


// controllers/withdrawController.js
const Withdraw = require('../models/withdrawModel');
const Member = require('../models/memberModel');

const withdrawRequest = async (req, res) => {
  const { member_user_id } = req.user;
  const { amount } = req.body;

  try {
    // Check if the member exists
    const member = await Member.findOne({ member_user_id });
    if (!member) {
      return res.status(400).json({
        status: false,
        message: 'No user found',
      });
    }

    // Generate a unique reference ID
    const ref_id = generateReferenceID();

    // Create a new withdrawal request
    const withdrawal = new Withdraw({
      member_user_id,
      member_name: member.member_name,
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
const updateWithdrawalStatus = async (req, res) => {
  try {
    const { with_referrance } = req.params;
    const { status, processed_by, remarks } = req.body;

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
    withdrawal.processing_date = new Date().toISOString(); // Set the current date and time as the processing_date;
    withdrawal.processed_by = processed_by;
    withdrawal.remarks = remarks;

    // Check if the status is "Approved" before deducting from member coins
    if (status === 'Approved') {
      // Find the member associated with the withdrawal request
      const member = await Member.findOne({ member_user_id: withdrawal.member_user_id });

      if (!member) {
        return res.status(404).json({ error: 'Member not found' });
      }

      // Deduct the withdrawal amount from the member's coin balance
      member.coins -= withdrawal.with_amt;
      await member.save();
    }

    // Save the updated withdrawal request
    const updatedWithdrawal = await withdrawal.save();

    res.status(200).json(updatedWithdrawal);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};




const getWithdrawRequests = async (req, res) => {
  // const { member_user_id } = req.user;

  try {
    // Fetch withdrawal requests for the current member
    // status 0 for pending
    const withdrawRequests = await Withdraw.find();

    if (withdrawRequests.length === 0) {
      return res.status(400).json({
        status: false,
        message: 'No withdrawal requests',
      });
    } else {
      return res.status(200).json({
        status: true,
        message: 'Withdrawal requests',
        data: withdrawRequests,
      });
    }
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

  try {
    // Fetch withdrawal requests for the current member
    // status 0 for pending
    const withdrawRequests = await Withdraw.find({ status: 'Pending' });

    if (withdrawRequests.length === 0) {
      return res.status(400).json({
        status: false,
        message: 'No withdrawal requests',
      });
    } else {
      return res.status(200).json({
        status: true,
        message: 'Withdrawal requests',
        data: withdrawRequests,
      });
    }
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

  try {
    // Fetch withdrawal requests for the current member
    // status 0 for pending
    const withdrawRequests = await Withdraw.find({ status: 'Approved' });

    if (withdrawRequests.length === 0) {
      return res.status(400).json({
        status: false,
        message: 'No withdrawal requests',
      });
    } else {
      return res.status(200).json({
        status: true,
        message: 'Withdrawal requests',
        data: withdrawRequests,
      });
    }
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

  try {
    // Fetch withdrawal requests for the current member
    // status 0 for pending
    const withdrawRequests = await Withdraw.find({ status: 'Rejected' });

    if (withdrawRequests.length === 0) {
      return res.status(400).json({
        status: false,
        message: 'No withdrawal requests',
      });
    } else {
      return res.status(200).json({
        status: true,
        message: 'Withdrawal requests',
        data: withdrawRequests,
      });
    }
  } catch (err) {
    console.error('Error:', err);
    return res.status(500).json({
      status: false,
      message: 'Internal Server Error',
    });
  }
};

const getUserWithdraws = async (req, res) => {
  const { member_user_id } = req.user;

  try {
    // Fetch withdrawal requests for the current member
    const withdrawRequests = await Withdraw.find({ member_user_id });

    if (withdrawRequests.length === 0) {
      return res.status(400).json({
        status: false,
        message: 'No withdrawal requests',
      });
    } else {
      return res.status(200).json({
        status: true,
        message: 'Withdrawal requests',
        data: withdrawRequests,
      });
    }
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

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

const withdrawRequest = async (req, res) => {
  const { user: member_user_id } = req;
  const { amount } = req.body;

  console.log(req.user)

  try {
    const member = await Member.findOne({ member_user_id });
    if (!member) {
      return res.status(400).send({
        status: false,
        message: "No user",
      });
    }

    let member_name = member.member_name;

    let ref_id = generateReferenceID();

    // Check if reference id already exists
    let existingWithdraw = await Withdraw.findOne({ with_referrance: ref_id });
    while (existingWithdraw) {
      ref_id = generateReferenceID();
      existingWithdraw = await Withdraw.findOne({ with_referrance: ref_id });
    }

    const withdraw = new Withdraw({
      member_user_id,
      member_name,
      with_amt: amount,
      with_referrance: ref_id,
    });

    await withdraw.save();

    return res.status(200).send({
      status: true,
      message: "Withdraw request sent",
    });
  } catch (err) {
    console.log(`error`, err);
    return res.status(500).send({
      status: false,
      message: "Internal Server Error",
    });
  }
};

const getWithdrawRequests = async (req, res) => {
  const { user } = req;
  try {
    const withdrawRequests = await Withdraw.find({ member_user_id: user });
    if (withdrawRequests.length === 0) {
      return res.status(400).send({
        status: false,
        message: "No withdraw requests",
      });
    } else {
      return res.status(200).send({
        status: true,
        message: "Withdraw requests",
        data: withdrawRequests,
      });
    }
  } catch (err) {
    return res.status(500).send({
      status: false,
      message: "Internal Server Error",
    });
  }
};

// Helper function to generate a reference ID
const generateReferenceID = () => {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let ref_id = "";
  const charactersLength = characters.length;
  for (let i = 0; i < 20; i++) {
    ref_id += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return ref_id;
};

module.exports = {
  withdrawRequest,
  getWithdrawRequests,
};

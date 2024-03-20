// require("dotenv").config();
// const connection = require("../config/db.config");
// const { promisify } = require("util");
// const query = promisify(connection.query).bind(connection);

// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");

// const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

// const getRegister = async (req, res) => {
//   let sponcer_id = req.query.sponcer_id;
//   let query1 = `SELECT * FROM tbl_memberreg WHERE member_user_id='${sponcer_id}'`;
//   const checkSponcer = await query(query1);
//   if (checkSponcer.length === 0) {
//     return res.status(400).send({
//       status: false,
//       message: "Invalid sponcer id",
//     });
//   }
//   let sponcer_name = checkSponcer[0].member_name;
//   return res.status(200).send({
//     status: true,
//     sponcer_name: sponcer_name,
//     sponcer_id: sponcer_id,
//   });
// };

// const register = async (req, res) => {
//   let sponcer_id = req.query.sponcer_id;
//   let member_user_id;
//   let query1 = `SELECT * FROM tbl_memberreg WHERE member_user_id='${sponcer_id}'`;
//   const checkSponcer = await query(query1);
//   if (checkSponcer.length === 0) {
//     return res.status(400).send({
//       status: false,
//       message: "Invalid sponcer id",
//     });
//   }

//   let sponcer_name = checkSponcer[0].member_name;
//   let contactNo = req.body.contactNo.trim();
//   let member_name = req.body.member_name.trim().toUpperCase();
//   let password = req.body.password.trim();
//   let cpassword = req.body.cpassword.trim();
//   let email = req.body.email.trim().toLowerCase();

//   if (password !== cpassword) {
//     return res.status(400).send({
//       status: false,
//       message: "Password and confirm password not matched",
//     });
//   }

//   const checkEmail = `SELECT * FROM tbl_memberreg WHERE email='${email}'`;
//   const checkEmailResult = await query(checkEmail);
//   if (checkEmailResult.length > 0) {
//     return res.status(400).send({
//       status: false,
//       message: "Email already registered",
//     });
//   }

//   let reg_date = new Date().toISOString().replace("T", " ").replace("Z", "");

//   console.log(`reg_date`, reg_date);

//   if (member_name.length < 3) {
//     res.status(400).send({
//       title: "Error",
//       message: "Fill Member Name",
//       status: "error",
//     });
//   } else if (contactNo.length !== 10) {
//     res.status(400).send({
//       title: "Error",
//       message: "Fill Valid Mobile No",
//       status: "error",
//     });
//   } else if (!phoneValidation(contactNo)) {
//     res.status(400).send({
//       title: "Error",
//       message: "Fill Valid Mobile Name",
//       status: "error",
//     });
//   } else if (!emailValidation(email)) {
//     res.status(400).send({
//       title: "Error",
//       message: "Fill Valid Email Id",
//       status: "error",
//     });
//   } else if (password.length < 6) {
//     res.status(400).send({
//       title: "Error",
//       message: "Password Must be 6 Charactor",
//       status: "error",
//     });
//   } else if (password !== cpassword) {
//     res.status(400).send({
//       title: "Error",
//       message: "Password and Confirm Password do not match",
//       status: "error",
//     });
//   } else {
//     member_user_id = generateRandomNumber();

//     let checkMemberId = `SELECT * FROM tbl_memberreg WHERE member_user_id='${member_user_id}'`;
//     let checkMemberIdResult = await query(checkMemberId);

//     while (checkMemberIdResult.length > 0) {
//       member_user_id = generateRandomNumber();
//       checkMemberId = `SELECT * FROM tbl_memberreg WHERE member_user_id='${member_user_id}'`;
//       checkMemberIdResult = await query(checkMemberId);
//     }
//   }

//   const salt = await bcrypt.genSalt(10);
//   password = await bcrypt.hash(password, salt);

//   let insertQuery = `INSERT INTO tbl_memberreg (member_user_id, sponcer_id, sponcer_name, member_name, contact, email, password, registration_date) VALUES ('${member_user_id}', '${sponcer_id}', '${sponcer_name}', '${member_name}', '${contactNo}', '${email}', '${password}', '${reg_date}')`;

//   try {
//     const insertResult = await query(insertQuery);
//     return res.status(200).send({
//       status: true,
//       message: "Registration successfully",
//       userId: member_user_id,
//     });
//   } catch (err) {
//     console.log("Error in registration", err);
//     return res.status(400).send({
//       status: false,
//       message: "Registration failed",
//     });
//   }
// };

// const login = async (req, res) => {
//   const { email, password } = req.body;

//   const checkUserQuery = `SELECT * FROM tbl_memberreg WHERE email = '${email}'`;
//   const checkUser = await query(checkUserQuery);
//   if (checkUser.length === 0) {
//     return res.status(400).send({
//       status: false,
//       message: "Invalid email!",
//     });
//   } else {
//     const validPassword = await bcrypt.compare(password, checkUser[0].password);
//     if (!validPassword) {
//       return res.status(400).send({
//         status: false,
//         message: "Invalid password!",
//       });
//     }

//     const token = jwt.sign(
//       { userId: checkUser[0].member_user_id },
//       JWT_SECRET_KEY,
//       {
//         expiresIn: "1h",
//       }
//     );

//     const user = checkUser[0];

//     const returnObject = {
//       member_user_id: user.member_user_id,
//       member_name: user.member_name,
//       sponcer_id: user.sponcer_id,
//       sponcer_name: user.sponcer_name,
//       wallet_address: user.wallet_address,
//       promoter_id: user.promoter_id,
//       promoter_name: user.promoter_name,
//       contact: user.contact,
//       email: user.email,
//       status: user.status,
//       registration_date: user.registration_date,
//       member_status: user.member_status,
//       kyc_status: user.kyc_status,
//       topup_amount: user.topup_amount,
//       direct_member: user.direct_member,
//       wallet_amount: user.wallet_amount,
//       checked: user.checked,
//       withdrawal_amt: user.withdrawal_amt,
//       block_status: user.block_status,
//       current_investment: user.current_investment,
//       direct_business: user.direct_business,
//       total_earning: user.total_earning,
//       isblock: user.isblock,
//       team_business: user.team_business,
//       expiry_date: user.expiry_date,
//       expiry_date2: user.expiry_date2,
//       team_member: user.team_member,
//       activation_date: user.activation_date,
//       profile_image: user.profile_image,
//       front_image: user.front_image,
//       back_image: user.back_image,
//       member_dob: user.member_dob,
//       address: user.address,
//       pincod: user.pincod,
//       gender: user.gender,
//       country_code: user.country_code,
//       state: user.state,
//       city: user.city,
//       calTeamStatus: user.calTeamStatus,
//       updateWallet: user.updateWallet,
//     };

//     return res.status(200).send({
//       status: true,
//       message: "Login successfully",
//       token,
//       user: returnObject,
//     });
//   }
// };

// function generateRandomNumber() {
//   const min = 1000000; // Minimum 7-digit number (inclusive)
//   const max = 9999999; // Maximum 7-digit number (inclusive)

//   return Math.floor(Math.random() * (max - min + 1)) + min;
// }

// function phoneValidation(phone) {
//   phone = testInput(phone);
//   if (/^\d{10}$/.test(phone)) {
//     return true;
//   } else {
//     return false;
//   }
// }
// function emailValidation(email) {
//   let emailVal =
//     /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/;
//   email = testInput(email);
//   if (emailVal.test(email)) {
//     return true;
//   } else {
//     return false;
//   }
// }

// function testInput(data) {
//   data = data.trim();
//   data = data.replace(/\\/g, "");
//   data = htmlspecialchars(data);
//   return data;
// }

// function htmlspecialchars(str) {
//   str = str.replace(/&/g, "&amp;");
//   str = str.replace(/</g, "&lt;");
//   str = str.replace(/>/g, "&gt;");
//   str = str.replace(/"/g, "&quot;");
//   str = str.replace(/'/g, "&#039;");
//   return str;
// }

// module.exports = {
//   register,
//   login,
//   getRegister,
// };

// pass: 'pvvw lqvk axxs kwha' // Your Gmail password or app password
const nodemailer = require('nodemailer');
const Member = require('../models/memberModel');
const Admin = require('../models/AdminModel');
const TemporaryRegistration = require('../models/TemporaryRegistration');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Joi = require('@hapi/joi');

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

// Function to generate a random number
function generateRandomNumber() {
  return Math.floor(100000 + Math.random() * 900000);
}


///=========================================================================================================================

// Function to send OTP to email
async function sendOTP(email, otp) {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: '191260107039setice@gmail.com', // Your Gmail email address
        pass: 'pvvw lqvk axxs kwha' // Your Gmail password
      }
    });

    const mailOptions = {
      from: '191260107039setice@gmail.com',
      to: email,
      subject: 'OTP Verification',
      text: `Your OTP for registration is: ${otp}`
    };

    await transporter.sendMail(mailOptions);
    console.log('OTP sent successfully.', email, otp);
  } catch (error) {
    console.error('Error sending OTP:', error);
    throw new Error('Failed to send OTP.');
  }
}

// Function to generate a random 6-digit OTP 
function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000); // 6-digit OTP
}

///=========================================================================================================================
async function register(req, res) {
  const registerSchema = Joi.object({
    contactNo: Joi.string().trim().min(10).max(10).required(),
    member_name: Joi.string().trim().min(3).required(),
    password: Joi.string().trim().min(6).required(),
    email: Joi.string().trim().email().lowercase().required(),
    twitterId: Joi.string().trim(),
    wallet_address: Joi.string().trim().required(),
  });

  try {
    // Validate request body parameters
    const { error, value } = registerSchema.validate(req.body);
    if (error) {
      return res.status(400).send({
        status: false,
        message: error.details[0].message,
      });
    }
    let { contactNo, member_name, password, email, twitterId, wallet_address } = value;

    // Check if the email is already registered
    const existingMember = await Member.findOne({ email: email });
    if (existingMember) {
      return res.status(400).send({
        status: false,
        message: "Email already registered",
      });
    }

    // Check if the contact number is already registered
    const existingMemberContact = await Member.findOne({ contactNo: contactNo });
    if (existingMemberContact) {
      return res.status(400).send({
        status: false,
        message: "Contact number already registered",
      });
    }

    // Generate OTP
    const otp = generateOTP();

    // Save registration data to temporary storage
    const temporaryRegistration = new TemporaryRegistration({
      email,
      otp,
      registrationData: {
        contactNo,
        member_name,
        password,
        email,
        twitterId,
        wallet_address,
      }
    });
    await temporaryRegistration.save();

    // Send OTP via email
    await sendOTP(email, otp);

    return res.status(200).send({
      status: true,
      message: "OTP sent to your email for verification",
      email: email,
    });
  } catch (err) {
    console.log("Error in registration", err);
    return res.status(400).send({
      status: false,
      message: "Registration failed",
    });
  }
}

async function verifyOTP(req, res) {
  const { otp: otpFromBody } = req.body; // Extract OTP from request body

  try {
    if (!otpFromBody) { // Check if OTP is missing in the request body
      return res.status(400).json({
        status: false,
        message: "OTP is required"
      });
    }

    // Find temporary registration data by OTP from request body
    const temporaryRegistrationFromBody = await TemporaryRegistration.findOne({ otp: otpFromBody });

    if (!temporaryRegistrationFromBody) {
      return res.status(400).send({
        status: false,
        message: "Invalid OTP"
      });
    }

    // Extract email from temporary registration data
    const { email } = temporaryRegistrationFromBody;

    // Find member by email
    let existingMember = await Member.findOne({ email });

    // If member exists, update the data, otherwise create a new member
    if (existingMember) {
      // Update existing member data
      const { contactNo, member_name, password, twitterId, wallet_address } = temporaryRegistrationFromBody.registrationData;
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      existingMember.member_name = member_name;
      existingMember.contactNo = contactNo;
      existingMember.wallet_address = wallet_address;
      existingMember.password = hashedPassword;
      existingMember.twitterId = twitterId;
      existingMember.isActive = true;

      await existingMember.save();
    } else {
      // Create new member instance using registration data
      const { contactNo, member_name, password, twitterId, wallet_address } = temporaryRegistrationFromBody.registrationData;
      const reg_date = new Date();
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const newMember = new Member({
        member_user_id: generateRandomNumber(),
        member_name,
        contactNo,
        wallet_address,
        email,
        password: hashedPassword,
        registration_date: reg_date,
        twitterId,
        isActive: true,
      });

      // Save the member to the database
      await newMember.save();
    }

    // Delete temporary registration data
    await temporaryRegistrationFromBody.deleteOne();

    return res.status(200).send({
      status: true,
      message: "Registration successful"
    });
  } catch (err) {
    console.log("Error in OTP verification", err);
    return res.status(400).send({
      status: false,
      message: "OTP verification failed"
    });
  }
}






//==========================================================================================================================
function generateRandomNumber() {
  const min = 1000000; // Minimum 7-digit number (inclusive)
  const max = 9999999; // Maximum 7-digit number (inclusive)

  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function phoneValidation(phone) {
  phone = testInput(phone);
  if (/^\d{10}$/.test(phone)) {
    return true;
  } else {
    return false;
  }
}
function emailValidation(email) {
  let emailVal =
    /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/;
  email = testInput(email);
  if (emailVal.test(email)) {
    return true;
  } else {
    return false;
  }
}

function testInput(data) {
  data = data.trim();
  data = data.replace(/\\/g, "");
  data = htmlspecialchars(data);
  return data;
}

function htmlspecialchars(str) {
  str = str.replace(/&/g, "&amp;");
  str = str.replace(/</g, "&lt;");
  str = str.replace(/>/g, "&gt;");
  str = str.replace(/"/g, "&quot;");
  str = str.replace(/'/g, "&#039;");
  return str;
}

// async function register(req, res) {
//   try {
//     const { sponcer_id, contactNo, member_name, password, cpassword, email } = req.body;

//     // Check if password and confirm password match
//     if (password !== cpassword) {
//       return res.status(400).send({
//         status: false,
//         message: "Password and confirm password not matched",
//       });
//     }

//     // Check if email is already registered
//     const existingMember = await Member.findOne({ email });
//     if (existingMember) {
//       return res.status(400).send({
//         status: false,
//         message: "Email already registered",
//       });
//     }

//     // Create new member
//     const member = new Member({
//       sponcer_id,
//       contactNo,
//       member_name: member_name, //.toUpperCase()
//       password,
//       email,
//     });
//     await member.save();

//     res.status(200).send({
//       status: true,
//       message: "Registration successfully",
//       userId: member._id,
//     });
//   } catch (error) {
//     console.error('Error in registration:', error);
//     res.status(500).send({ status: false, message: 'Internal Server Error' });
//   }
// }

// Function to generate OTP

//==============================================================================================================================

// async function register(req, res) {
//   const registerSchema = Joi.object({
//     contactNo: Joi.string().trim().min(10).max(10).required(),
//     member_name: Joi.string().trim().min(3).required(),
//     password: Joi.string().trim().min(6).required(),
//     email: Joi.string().trim().email().lowercase().required(),
//     twitterId: Joi.string().trim(),
//     wallet_address: Joi.string().trim().required(),
//   });

//   try {
//     // Validate request body parameters
//     const { error, value } = registerSchema.validate(req.body);
//     if (error) {
//       return res.status(400).send({
//         status: false,
//         message: error.details[0].message,
//       });
//     }
//     let { contactNo, member_name, password, email, twitterId, wallet_address } = value;


//     // Check if the email is already registered
//     const existingMember = await Member.findOne({ email: email });
//     if (existingMember) {
//       return res.status(400).send({
//         status: false,
//         message: "Email already registered",
//       });
//     }


//     // Check if the contact number is already registered
//     const existingMemberContact = await Member.findOne({ contactNo: contactNo });
//     if (existingMemberContact) {
//       return res.status(400).send({
//         status: false,
//         message: "Contact number already registered",
//       });
//     }




//     let reg_date = new Date();

//     if (member_name.length < 3 || contactNo.length !== 10 || !phoneValidation(contactNo) || !emailValidation(email) || password.length < 6) {
//       return res.status(400).send({
//         title: "Error",
//         message: "Invalid data provided",
//         status: "error",
//       });
//     }

//     member_user_id = generateRandomNumber();

//     let member = await Member.findOne({ member_user_id: member_user_id });
//     while (member) {
//       member_user_id = generateRandomNumber();
//       member = await Member.findOne({ member_user_id: member_user_id });
//     }

//     const salt = await bcrypt.genSalt(10);
//     password = await bcrypt.hash(password, salt);

//     // Create new member instance
//     const newMember = new Member({
//       member_user_id,
//       member_name,
//       contactNo: contactNo,
//       wallet_address,
//       email,
//       password,
//       registration_date: reg_date,
//       twitterId,
//       isActive: true,
//       // isBlocked: false,
//     });

//     // Save the member to the database
//     await newMember.save();

//     return res.status(200).send({
//       status: true,
//       message: "Registration successfully",
//       userId: member_user_id,
//     });
//   } catch (err) {
//     console.log("Error in registration", err);
//     return res.status(400).send({
//       status: false,
//       message: "Registration failed",
//     });
//   }
// };


async function login(req, res) {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  });



  try {
    const { error, value } = schema.validate(req.body);

    if (error) {
      return res.status(400).send({
        status: false,
        message: error.details[0].message,
      });
    }
    const { email, password } = value;
    const user = await Member.findOne({ email: email });

    console.log(user)
    if (!user) {
      return res.status(400).send({
        status: false,
        message: "Invalid email!",
      });
    } else {

      const validPassword = await bcrypt.compare(password, user.password);

      console.log(validPassword)

      if (!validPassword) {
        return res.status(400).send({
          status: false,
          message: "Invalid password!",
        });
      }


      const token = jwt.sign(
        { userId: user.member_user_id, userType: user.userType },
        process.env.JWT_SECRET_KEY,
        {
          expiresIn: '100d'
        }
      );

      const returnObject = {
        member_user_id: user.member_user_id,
        member_name: user.member_name,
        sponcer_id: user.sponcer_id,
        sponcer_name: user.sponcer_name,
      };

      return res.status(200).send({
        status: true,
        message: "Login successfully",
        token,
        user: returnObject,
      });
    }
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).send({
      status: false,
      message: "Internal server error",
    });
  }
};

async function getRegister(req, res) {
  try {
    const sponcer_id = req.query.sponcer_id;

    // Find sponsor by ID
    const sponcer = await Member.findById(sponcer_id);
    if (!sponcer) {
      return res.status(400).send({
        status: false,
        message: "Invalid sponsor id",
      });
    }

    res.status(200).send({
      status: true,
      sponcer_name: sponcer.member_name,
      sponcer_id,
    });
  } catch (error) {
    console.error('Error in getRegister:', error);
    res.status(500).send({ status: false, message: 'Internal Server Error' });
  }
}

async function adminRegister(req, res) {
  const schema = Joi.object({
    admin_name: Joi.string().required(),
    password: Joi.string().min(6).required(),
    email: Joi.string().email().required(),
  });
  try {
    const { error, value } = schema.validate(req.body);

    if (error) {
      return res.status(400).send({
        status: false,
        message: error.details[0].message,
      });
    }
    // Extract data from validated request body
    const { admin_name, password, email } = value;

    // Check if email is already registered
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).send({
        status: false,
        message: "Email already registered",
      });
    }

    // Hash the password
    // const hashedPassword = await bcrypt.hash(password, 10);

    const admin_user_id = generateRandomNumber();

    // Create new admin instance
    const newAdmin = new Admin({
      admin_user_id,
      admin_name,
      password,
      email,
    });

    // Save the admin to the database
    const response = await newAdmin.save();

    console.log(response);
    return res.status(200).send({
      status: true,
      message: "Admin registration successful",
    });

  } catch (err) {
    console.log("Error in admin registration", err);
    return res.status(500).send({
      status: false,
      message: "Admin registration failed",
    });
  }
}

async function adminLogin(req, res) {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });

  try {
    const { error, value } = schema.validate(req.body);

    if (error) {
      return res.status(400).send({
        status: false,
        message: error.details[0].message,
      });
    }

    const { email, password } = value;

    // Find admin by email
    const admin = await Admin.findOne({ email });

    if (!admin) {
      return res.status(400).send({
        status: false,
        message: "Invalid credentials!",
      });
    }

    // Compare passwords
    const validPassword = await bcrypt.compare(password, admin.password);

    if (!validPassword) {
      return res.status(400).send({
        status: false,
        message: "Invalid credentials!",
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: admin.admin_user_id, userType: admin.userType },
      JWT_SECRET_KEY,
      { expiresIn: '100d' }
    );

    return res.status(200).send({
      status: true,
      message: "Admin login successful",
      token,
    });
  } catch (error) {
    console.error("Error during admin login:", error);
    return res.status(500).send({
      status: false,
      message: "Internal server error",
    });
  }
}

module.exports = {
  register,
  login,
  getRegister,
  adminRegister,
  adminLogin,
  verifyOTP
};

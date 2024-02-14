// const mongoose = require('mongoose');
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');

// const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

// const memberSchema = new mongoose.Schema({
//   member_user_id: { type: String, required: true, unique: true },
//   sponcer_id: String,
//   sponcer_name: String,
//   member_name: { type: String, required: true },
//   contact: { type: String, required: true },
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
//   registration_date: { type: Date, default: Date.now }
// });

// memberSchema.pre('save', async function(next) {
//   const member = this;
//   if (!member.isModified('password')) return next();
//   const salt = await bcrypt.genSalt(10);
//   member.password = await bcrypt.hash(member.password, salt);
//   next();
// });

// memberSchema.methods.generateAuthToken = function() {
//   const member = this;
//   return jwt.sign({ _id: member._id }, JWT_SECRET_KEY, { expiresIn: '1h' });
// };

// const Member = mongoose.model('Member', memberSchema);

// module.exports = Member;



const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const memberSchema = new mongoose.Schema({
  member_user_id: { type: String, required: true, unique: true },
  sponcer_id: { type: String },   //mongoose.Schema.Types.ObjectId
  sponcer_name: { type: String },
  contactNo: { type: String, required: true },
  member_name: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  registration_date: { type: Date, default: Date.now },
  coins: { type: Number, default: 0 },
  userType: { type: String, default: 'member' }
});

memberSchema.pre('save', async function(next) {
  const member = this;
  if (!member.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  member.password = await bcrypt.hash(member.password, salt);
  next();
});

const Member = mongoose.model('Member', memberSchema);

module.exports = Member;

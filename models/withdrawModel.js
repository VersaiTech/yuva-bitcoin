// models/withdrawModel.js
const mongoose = require('mongoose');

const withdrawSchema = new mongoose.Schema({
  member_user_id: { type: String, required: true },
  member_name: { type: String, required: true },
  with_amt: { type: Number, required: true },
  with_date: { type: Date, default: Date.now },
  with_referrance: { type: String, required: true, unique: true },
});

const Withdraw = mongoose.model('Withdraw', withdrawSchema);

module.exports = Withdraw;

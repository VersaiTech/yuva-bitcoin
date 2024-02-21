const mongoose = require('mongoose');

// Define the schema for cash deposit
const depositSchema = new mongoose.Schema({
  member_user_id: { type: String, required: true, ref: 'Member' },
  member_name: { type: String },
  sys_date: { type: Date, default: Date.now },
  amount: { type: Number, required: true },
  transaction_id: { type: String },
  deposit_method: { type: String, required: true }, // You can customize this field based on the methods you support
});

// Create a model from the schema
const Deposit = mongoose.model('Deposit', depositSchema);

module.exports = Deposit;

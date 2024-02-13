const mongoose = require('mongoose');

// Define the schema for staking deposits
const depositSchema = new mongoose.Schema({
  member_user_id: { type: String, required: true, },
  member_name: { type: String, required: true },
  sys_date: { type: Date, default: Date.now },
  investment: { type: Number, required: true },
  transaction_id: { type: String, required: true },
  walletAddress: { type: String, required: true },
  deposit_type: { type: String, enum: ['Wallet'], required: true },
});

// Create a model from the schema
const Deposit = mongoose.model('Deposit', depositSchema);

module.exports = Deposit;

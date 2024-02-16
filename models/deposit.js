const mongoose = require('mongoose');

// Define the schema for staking deposits
const depositSchema = new mongoose.Schema({
  member_user_id: { type: String,required: true, ref: 'Member' },
  member_name: { type: String, required: true },
  sys_date: { type: Date, default: Date.now },
  investment: { type: Number, required: true },
  transaction_id: { type: String, required: true },
  walletAddress: { type: String },
  deposit_type: { type: String, enum: ['Wallet'], required: true },
  stakingDuration: { type: Number, required: true }, // Add staking duration field
  interestRate: { type: Number }, // Add interest rate field
});

// Create a model from the schema
const Deposit = mongoose.model('Deposit', depositSchema);

module.exports = Deposit;

const mongoose = require('mongoose');// Define the schema for cash deposit
const convertHistorySchema = new mongoose.Schema({
    member: {
        type: String, ref: 'Member',
        required: true
    },
    name: {
        type: String, ref: 'Member',
        required: true
    },
    amount: {
        type: Number, ref: "Deposit",
        // required: true
    },
    transaction_hash: {
        type: String, ref: "Deposit",
        // required: true,
        // unique: true,
    },
    wallet_address: {
        type: String, ref: "Deposit",
        ref: 'Member',
        required: true
    },
    deposit_type: {
        type: String, enum: ['usdt', 'bnb', 'matic'],
        required: true
    },
    sys_date: { type: Date, default: Date.now },


}, { timestamps: true });

// Create a model from the schema
const ConvertHistory = mongoose.model('ConvertHistory', convertHistorySchema);

module.exports = ConvertHistory;

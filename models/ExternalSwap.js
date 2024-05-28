const mongoose = require('mongoose');

const ExternalSwapSchema = new mongoose.Schema({
    deposit_type: {
        type: String,
        enum: ['usdt', 'bnb'],
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    transaction_hash: {
        type: String,
        required: true,
        unique: true
    },
    wallet_address: {
        type: String,
        required: true
    },
    orderId: {
        type: String,
        unique: true
    },
    status: {
        type: String,
        enum: ['Pending', 'Approved', 'Rejected'],
        default: 'Pending'
    },
    reason: {
        type: String,
    }
}, {
    timestamps: true
});

const ExternalSwap = mongoose.model('ExternalSwap', ExternalSwapSchema);
module.exports = { ExternalSwap }
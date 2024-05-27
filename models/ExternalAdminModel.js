const mongoose = require('mongoose');

const ExternalAdminSchema = new mongoose.Schema({
    deposit_type: {
        type: String,
        enum: ['usdt', 'bnb'],
        ref: 'ExternalSwap'
    },
    amount: {
        type: Number,
        ref: 'ExternalSwap'
    },
    transaction_hash: {
        type: String,
        ref: 'ExternalSwap'
    },
    wallet_address: {
        type: String,
        ref: 'ExternalSwap'
    },
    orderId: {
        type: String,
        unique: true,
        ref: 'ExternalSwap'
    },
    status: {
        type: String,
        enum: ['Pending', 'Approved', 'Rejected'],
        default: 'Pending',
        require: true,
        ref: 'ExternalSwap'
    },
    reason: {
        type: String,
    }
}, {
    timestamps: true
});


const ExternalAdmin = mongoose.model('ExternalAdmin', ExternalAdminSchema);
module.exports = { ExternalAdmin }
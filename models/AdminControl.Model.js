const mongoose = require('mongoose');

const AdminControlSchema = new mongoose.Schema({
    //set market place coin amount
    amount: {
        type: Number,
        required: true
    },
    minimum_amount: {
        type: Number,
        required: true
    },

    // set withdrawal
    minimum_withdrawal: {
        type: Number,
        required: true
    },
    maximum_withdrawal: {
        type: Number,
        required: true
    },

    //set register coin amount
    register_amount: {
        type: Number,
        required: true
    },

    //referral coin amount
    referral_amount: {
        type: Number,
        required: true
    },

    //set stake month and percentage
    stake_month_1: {
        type: Number,
        required: true
    },
    percentage_1: {
        type: Number,
        required: true
    },
    stake_month_2: {
        type: Number,
        required: true
    },
    percentage_2: {
        type: Number,
        required: true
    },
    stake_month_3: {
        type: Number,
        required: true
    },
    percentage_3: {
        type: Number,
        required: true
    },
}, {
    timestamps: true
});

const AdminControl = mongoose.model('AdminControl', AdminControlSchema);
module.exports = AdminControl
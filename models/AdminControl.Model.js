const mongoose = require('mongoose');


const AdminControlSchema = new mongoose.Schema({
    admin_user_id: { type: String, required: true, ref: 'Admin' },
    setCoinValueMarketUsdt: { type: Number, required: true },
    setMinimumAmountMarketUsdt: { type: Number, required: true },
    setCoinValueMarketYUVA: { type: Number, required: true },
    setMinimumAmountMarketYUVA: { type: Number, required: true },
    setMinimumWithdrawal: { type: Number, required: true },
    setMaximumWithdrawal: { type: Number, required: true },
    setMinimumWithdrawalusdt: { type: Number, required: true },
    setMaximumWithdrawalusdt: { type: Number, required: true },
    setRegisterCoinValue: { type: Number, required: true },
    setReferralCoinValue: { type: Number, required: true },
    setMinimumReferralamount: { type: Number, required: true },
    setStakeMonth1: { type: Number, required: true },
    setStakeMonth2: { type: Number, required: true },
    setStakeMonth3: { type: Number, required: true },
    setStakePercent1: { type: Number, required: true },
    setStakePercent2: { type: Number, required: true },
    setStakePercent3: { type: Number, required: true },

    setCreateBlog: { type: Number, required: true },
    setWithdrawalApprove: { type: Number, required: true },
    setTaskApprove: { type: Number, required: true },
    setTaskCreate: { type: Number, required: true },
    setUserBlock: { type: Number, required: true },
    setAllTaskApprove: { type: Number, required: true },
}, {
    timestamps: true
});

const AdminControl = mongoose.model('AdminControl', AdminControlSchema);
module.exports = AdminControl



// const AdminControlSchema = new mongoose.Schema({
//     //set market place coin amount
//     amount: {
//         type: Number,
//         required: true
//     },
//     minimum_amount: {
//         type: Number,
//         required: true
//     },

//     // set withdrawal
//     minimum_withdrawal: {
//         type: Number,
//         required: true
//     },
//     maximum_withdrawal: {
//         type: Number,
//         required: true
//     },

//     //set register coin amount
//     register_amount: {
//         type: Number,
//         required: true
//     },

//     //referral coin amount
//     referral_amount: {
//         type: Number,
//         required: true
//     },

//     //set stake month and percentage
//     stake_month_1: {
//         type: Number,
//         required: true
//     },
//     percentage_1: {
//         type: Number,
//         required: true
//     },
//     stake_month_2: {
//         type: Number,
//         required: true
//     },
//     percentage_2: {
//         type: Number,
//         required: true
//     },
//     stake_month_3: {
//         type: Number,
//         required: true
//     },
//     percentage_3: {
//         type: Number,
//         required: true
//     },
// }, {
//     timestamps: true
// });

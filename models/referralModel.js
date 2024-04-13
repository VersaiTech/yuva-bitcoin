const monogoose = require('mongoose');

const ReferralHistorySchema = new monogoose.Schema({
    user_id: {
        type: String,
        required: true
    },
    user_name: {
        type: String,
        required: true
    },
    user_earned: {
        type: Number,
        required: true
    },
    referral_code: {
        type: String,
        required: true
    },
    referral_user: {
        type: String,
        required: true
    },
    referral_user_name: {
        type: String,
        required: true
    },
    referral_user_isRefered: {
        type: Boolean,
        ref: 'Deposit',
    }

}, { timestamps: true });

module.exports = monogoose.model('ReferralHistory', ReferralHistorySchema)
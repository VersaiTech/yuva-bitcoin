const monogoose = require('mongoose');

const ReferalHistorySchema = new monogoose.Schema({
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
    referal_code: {
        type: String,
        required: true
    },
    referal_user: {
        type: String,
        required: true
    },
    referal_user_name: {
        type: String,
        required: true
    },
    referal_user_isRefered: {
        type: Boolean,
        ref: 'Deposit',
    }

}, { timestamps: true });

module.exports = monogoose.model('ReferalHistory', ReferalHistorySchema)
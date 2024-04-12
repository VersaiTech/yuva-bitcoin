const monogoose = require('mongoose');

const ReferalHistorySchema = new monogoose.Schema({
    user_id: {
        type: String,
        required: true
    },
    referal_code: {
        type: String,
        required: true
    },
    referal_user: {
        type: String,
        required: true

    }

}, { timestamps: true });

module.exports = monogoose.model('ReferalHistory', ReferalHistorySchema)
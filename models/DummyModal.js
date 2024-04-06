const mongoose = require('mongoose');

const dummySchema = new mongoose.Schema({
    totalRegisteredMembers: {
        type: Number,
        required: true
    },
    totalCoinHolders: {
        type: Number,
        required: true
    },
    totalStakedCoins: {
        type: Number,
        required: true
    },
    totalSellTodayUSDT: {
        type: Number,
        required: true
    },
    totalSellTodayYuva: {
        type: Number,
        required: true
    },
    totalBuyTodayUSDT: {
        type: Number,
        required: true
    },
    totalBuyTodayYuva: {
        type: Number,
        required: true
    },
    totalUSDT: {
        type: Number,
        required: true
    },
    totalYuva: {
        type: Number,
        required: true
    }
}, { timestamps: true });


const Dummy = mongoose.model('Dummy', dummySchema);
module.exports = Dummy
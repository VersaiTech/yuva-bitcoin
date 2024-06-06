const mongoose = require('mongoose');

const PermissionSchema = new mongoose.Schema({
    admin_user_id: { type: String, required: true, ref: 'Admin' },
    setCoinValueMarketUsdt: { type: Boolean, default: false },
    setMinimumAmountMarketUsdt: { type: Boolean, default: false },
    setCoinValueMarketYUVA: { type: Boolean, default: false },
    setMinimumAmountMarketYUVA: { type: Boolean, default: false },
    setMinimumWithdrawal: { type: Boolean, default: false },
    setMaximumWithdrawal: { type: Boolean, default: false },
    setMinimumWithdrawalusdt: { type: Boolean, default: false },
    setMaximumWithdrawalusdt: { type: Boolean, default: false },
    setRegisterCoinValue: { type: Boolean, default: false },
    setReferralCoinValue: { type: Boolean, default: false },
    setStakeMonth1: { type: Boolean, default: false },
    setStakeMonth2: { type: Boolean, default: false },
    setStakeMonth3: { type: Boolean, default: false },
    setStakePercent1: { type: Boolean, default: false },
    setStakePercent2: { type: Boolean, default: false },
    setStakePercent3: { type: Boolean, default: false },
}, { timestamps: true });

const Permission = mongoose.model('Permission', PermissionSchema);
module.exports = Permission
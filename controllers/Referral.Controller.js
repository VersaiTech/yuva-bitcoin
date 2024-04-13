const Deposit = require("../models/deposit");
const Member = require("../models/memberModel");
const ReferralHistory = require("../models/referralModel");


const getAllReferral = async (req, res) => {
    try {
        const adminId = req.user.admin_user_id;
        if (!adminId) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const referrals = await ReferralHistory.find();
        return res.status(200).json({ referrals });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}


module.exports = { getAllReferral }
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

const getUserReferral = async (req, res) => {
    try {
        const adminId = req.user.admin_user_id;
        if (!adminId) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const { user_id } = req.params;
        const referrals = await ReferralHistory.find({ user_id });
        console.log(referrals);

        if (!referrals.length) {
            return res.status(404).json({ message: 'Referrals not found' });
        }
        return res.status(200).json({ referrals });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

//getReferralForUser
const getReferralForUser = async (req, res) => {
    try {
        const userId = req.user.member_user_id;
        if (!userId) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        const referrals = await ReferralHistory.find({ user_id: userId });
        return res.status(200).json({ referrals });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

module.exports = { getAllReferral, getUserReferral, getReferralForUser }
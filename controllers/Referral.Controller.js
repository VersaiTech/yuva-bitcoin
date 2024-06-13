const Deposit = require("../models/deposit");
const Member = require("../models/memberModel");
const ReferralHistory = require("../models/referralModel");
const Joi = require("joi");


// const getAllReferral = async (req, res) => {
//     try {
//         const adminId = req.user.admin_user_id;
//         if (!adminId) {
//             return res.status(401).json({ message: 'Unauthorized' });
//         }

//         const totalReferral = await ReferralHistory.countDocuments();
//         const referrals = await ReferralHistory.find();
//         return res.status(200).json({ referrals, totalReferral });
//     } catch (error) {
//         return res.status(500).json({ message: error.message });
//     }
// }

async function getAllReferral(req, res) {
    const Schema = Joi.object({
        page_number: Joi.number(),
        count: Joi.number(),
    });
    const { error, value } = Schema.validate(req.params);

    if (error) {
        return res
            .status(400)
            .json({ status: false, error: error.details[0].message });
    }
    try {

        const adminId = req.user.admin_user_id;
        if (!adminId) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const page_number = value.page_number || 1;
        const count = value.count || 10;
        const offset = (page_number - 1) * count;

        const totalReferral = await ReferralHistory.countDocuments();
        const referrals = await ReferralHistory.find()
            .sort({ createdAt: -1 })
            .skip(offset)
            .limit(count);

        if (!referrals || referrals.length === 0) {
            return res.status(200).json({
                status: false,
                message: "No Referral found",
                externalSwap: [],
            });
        }

        return res.status(200).json({
            status: true,
            message: "Referral found",
            referrals: referrals,
            totalReferral: totalReferral,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error" });
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
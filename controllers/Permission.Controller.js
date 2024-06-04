const Permission = require('../models/permission.model');
const Admin = require('../models/AdminModel');
const AdminControl = require('../models/AdminControl.Model');
const Member = require('../models/memberModel');
const Joi = require('@hapi/joi');



const agentHandler = async (req, res) => {
    const Schema = Joi.object({
        admin_user_id: Joi.string().required(),
        isActive: Joi.boolean(),
    }).unknown();

    try {
        const { error, value } = Schema.validate(req.params);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }
        const admin = req.user;

        if (admin.userType !== 'admin') {
            return res.status(403).json({ error: 'Permission denied. Only admin can access this route.' });
        }


        const { admin_user_id } = value;

        const { isActive } = req.body;
        if (!isActive) {
            return res.status(400).json({ error: 'isActive field is required' });
        }

        const checkAgent = await Admin.findOne({ admin_user_id: admin_user_id });
        if (!checkAgent) {
            return res.status(400).json({ error: 'Agent not found' });
        }

        const updateAgent = await Admin.updateOne({ admin_user_id: admin_user_id }, { isActive: isActive });
        if (!updateAgent) {
            return res.status(400).json({ error: 'Failed to update agent' });
        }

        return res.status(200).json({ status: true, message: 'Agent updated successfully', data: updateAgent });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}


const grantPermission = async (req, res) => {
    const Schema = Joi.object({
        admin_user_id: Joi.string().required(),
        setCoinValueMarketUsdt: Joi.boolean(),
        setMinimumAmountMarketUsdt: Joi.boolean(),
        setCoinValueMarketYUVA: Joi.boolean(),
        setMinimumAmountMarketYUVA: Joi.boolean(),
        setMinimumWithdrawal: Joi.boolean(),
        setMaximumWithdrawal: Joi.boolean(),
        setRegisterCoinValue: Joi.boolean(),
        setReferralCoinValue: Joi.boolean(),
        setStakeMonth1: Joi.boolean(),
        setStakeMonth2: Joi.boolean(),
        setStakeMonth3: Joi.boolean(),
        setStakePercent1: Joi.boolean(),
        setStakePercent2: Joi.boolean(),
        setStakePercent3: Joi.boolean(),
    }).unknown()
    const { error, value } = Schema.validate(req.body);
    if (error) { return res.status(400).json({ error: error.details[0].message }) };

    try {

        const checkAdmin = req.user
        if (checkAdmin.userType !== 'admin') {
            return res.status(403).json({ error: 'Permission denied. Only admin can access this route.' });
        }

        if (!value.admin_user_id) { return res.status(400).json({ error: 'Admin user id is required' }) };

        const adminControl = await Admin.findOne({ admin_user_id: value.admin_user_id });
        if (!adminControl) { return res.status(400).json({ error: 'Agent not found' }) };

        if (!adminControl.isActive) { return res.status(400).json({ error: 'Agent is not active' }) };

        const admin = await Admin.findOne({ admin_user_id: value.admin_user_id });
        if (!admin) { return res.status(400).json({ error: 'Agent not found' }) };

        const permission = await Permission.findOne({ admin_user_id: value.admin_user_id });
        if (permission) {
            let updatedPermission = permission;
            for (const field in value) {
                if (value.hasOwnProperty(field) && value[field] !== undefined) {
                    updatedPermission[field] = value[field];
                }
            }
            await updatedPermission.save();
            return res.status(201).json({ message: 'Permission updated successfully' });
        }
        const newPermission = new Permission(value);
        await newPermission.save();
        return res.status(201).json({ message: 'Permission granted successfully', data: newPermission });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}



// const adminSetValue = async (req, res) => {
//     const Schema = Joi.object({
//         admin_user_id: Joi.string(),
//         setCoinValueMarketUsdt: Joi.number(),
//         setMinimumAmountMarketUsdt: Joi.number(),
//         setMinimumWithdrawal: Joi.number(),
//         setMaximumWithdrawal: Joi.number(),
//         setRegisterCoinValue: Joi.number(),
//         setReferralCoinValue: Joi.number(),
//         setStakeMonth1: Joi.number(),
//         setStakeMonth2: Joi.number(),
//         setStakeMonth3: Joi.number(),
//         setStakePercent1: Joi.number(),
//         setStakePercent2: Joi.number(),
//         setStakePercent3: Joi.number(),
//     }).optional();

//     const { error, value } = Schema.validate(req.body);
//     if (error) return res.status(400).json({ error: error.details[0].message });

//     try {
//         const adminId = value.admin_user_id;

//         // Fetch permissions for the admin
//         const permission = await Permission.findOne({ admin_user_id: adminId });
//         if (!permission) return res.status(400).json({ error: 'Permission not granted for the admin' });

//         // Create or update AdminControl record based on permissions
//         const adminControl = await AdminControl.findOneAndUpdate(
//             { admin_user_id: adminId },
//             {
//                 $set: {
//                     setCoinValueMarketUsdt: permission.setCoinValueMarketUsdt ? value.setCoinValueMarketUsdt : undefined,
//                     setMinimumAmountMarketUsdt: permission.setMinimumAmountMarketUsdt ? value.setMinimumAmountMarketUsdt : undefined,
//                     setMinimumWithdrawal: permission.setMinimumWithdrawal ? value.setMinimumWithdrawal : undefined,
//                     setMaximumWithdrawal: permission.setMaximumWithdrawal ? value.setMaximumWithdrawal : undefined,
//                     setRegisterCoinValue: permission.setRegisterCoinValue ? value.setRegisterCoinValue : undefined,
//                     setReferralCoinValue: permission.setReferralCoinValue ? value.setReferralCoinValue : undefined,
//                     setStakeMonth1: permission.setStakeMonth1 ? value.setStakeMonth1 : undefined,
//                     setStakeMonth2: permission.setStakeMonth2 ? value.setStakeMonth2 : undefined,
//                     setStakeMonth3: permission.setStakeMonth3 ? value.setStakeMonth3 : undefined,
//                     setStakePercent1: permission.setStakePercent1 ? value.setStakePercent1 : undefined,
//                     setStakePercent2: permission.setStakePercent2 ? value.setStakePercent2 : undefined,
//                     setStakePercent3: permission.setStakePercent3 ? value.setStakePercent3 : undefined,
//                 }
//             },
//             { upsert: true, new: true }
//         );

//         return res.status(200).json({ message: 'Admin control updated successfully', data: adminControl });
//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({ error: 'Internal server error' });
//     }
// }


const adminSetValue = async (req, res) => {
    const Schema = Joi.object({
        admin_user_id: Joi.string(),
        setCoinValueMarketUsdt: Joi.number(),
        setMinimumAmountMarketUsdt: Joi.number(),
        setMinimumAmountMarketYUVA: Joi.number(),
        setCoinValueMarketYUVA: Joi.number().precision(2),
        setMinimumWithdrawal: Joi.number(),
        setMaximumWithdrawal: Joi.number(),
        setRegisterCoinValue: Joi.number(),
        setReferralCoinValue: Joi.number(),
        setStakeMonth1: Joi.number(),
        setStakeMonth2: Joi.number(),
        setStakeMonth3: Joi.number(),
        setStakePercent1: Joi.number(),
        setStakePercent2: Joi.number(),
        setStakePercent3: Joi.number(),
    }).optional();

    const { error, value } = Schema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    try {
        const adminId = value.admin_user_id;

        // Fetch permissions for the admin
        const permission = await Permission.findOne({ admin_user_id: adminId });
        if (!permission) return res.status(400).json({ error: 'Permission not granted for the admin' });

        // Only agents can proceed further
        // if (req.user.userType !== 'agent') {
        //     return res.status(400).json({ error: 'Only agents can perform this action' });
        // }

        // Fetch permissions for the admin
        // const permission = await Permission.findOne({ admin_user_id: adminId });
        // if (!permission) {
        //     return res.status(400).json({ error: 'Admin not found' });
        // }

        if (req.user.isActive === false) {
            return res.status(400).json({ error: 'Agent is not Active' });
        }

        const invalidFields = [];

        // Create or update AdminControl record based on permissions
        const adminControl = await AdminControl.findOneAndUpdate(
            { admin_user_id: adminId },
            {
                $set: {
                    setCoinValueMarketUsdt: permission.setCoinValueMarketUsdt ? value.setCoinValueMarketUsdt : undefined,
                    setMinimumAmountMarketUsdt: permission.setMinimumAmountMarketUsdt ? value.setMinimumAmountMarketUsdt : undefined,
                    setCoinValueMarketYUVA: permission.setCoinValueMarketYUVA ? value.setCoinValueMarketYUVA : undefined,
                    setMinimumAmountMarketYUVA: permission.setMinimumAmountMarketYUVA ? value.setMinimumAmountMarketYUVA : undefined,
                    setMinimumWithdrawal: permission.setMinimumWithdrawal ? value.setMinimumWithdrawal : undefined,
                    setMaximumWithdrawal: permission.setMaximumWithdrawal ? value.setMaximumWithdrawal : undefined,
                    setRegisterCoinValue: permission.setRegisterCoinValue ? value.setRegisterCoinValue : undefined,
                    setReferralCoinValue: permission.setReferralCoinValue ? value.setReferralCoinValue : undefined,
                    setStakeMonth1: permission.setStakeMonth1 ? value.setStakeMonth1 : undefined,
                    setStakeMonth2: permission.setStakeMonth2 ? value.setStakeMonth2 : undefined,
                    setStakeMonth3: permission.setStakeMonth3 ? value.setStakeMonth3 : undefined,
                    setStakePercent1: permission.setStakePercent1 ? value.setStakePercent1 : undefined,
                    setStakePercent2: permission.setStakePercent2 ? value.setStakePercent2 : undefined,
                    setStakePercent3: permission.setStakePercent3 ? value.setStakePercent3 : undefined,
                }
            },
            { upsert: true, new: true }
        );

        // Check for invalid fields
        if (!permission.setCoinValueMarketUsdt && value.setCoinValueMarketUsdt !== undefined) invalidFields.push('setCoinValueMarketUsdt');
        if (!permission.setMinimumAmountMarketUsdt && value.setMinimumAmountMarketUsdt !== undefined) invalidFields.push('setMinimumAmountMarketUsdt');
        if (!permission.setCoinValueMarketYUVA && value.setCoinValueMarketYUVA !== undefined) invalidFields.push('setCoinValueMarketYUVA');
        if (!permission.setMinimumAmountMarketYUVA && value.setMinimumAmountMarketYUVA !== undefined) invalidFields.push('setMinimumAmountMarketYUVA');
        if (!permission.setMinimumWithdrawal && value.setMinimumWithdrawal !== undefined) invalidFields.push('setMinimumWithdrawal');
        if (!permission.setMaximumWithdrawal && value.setMaximumWithdrawal !== undefined) invalidFields.push('setMaximumWithdrawal');
        if (!permission.setRegisterCoinValue && value.setRegisterCoinValue !== undefined) invalidFields.push('setRegisterCoinValue');
        if (!permission.setReferralCoinValue && value.setReferralCoinValue !== undefined) invalidFields.push('setReferralCoinValue');
        if (!permission.setStakeMonth1 && value.setStakeMonth1 !== undefined) invalidFields.push('setStakeMonth1');
        if (!permission.setStakeMonth2 && value.setStakeMonth2 !== undefined) invalidFields.push('setStakeMonth2');
        if (!permission.setStakeMonth3 && value.setStakeMonth3 !== undefined) invalidFields.push('setStakeMonth3');
        if (!permission.setStakePercent1 && value.setStakePercent1 !== undefined) invalidFields.push('setStakePercent1');
        if (!permission.setStakePercent2 && value.setStakePercent2 !== undefined) invalidFields.push('setStakePercent2');
        if (!permission.setStakePercent3 && value.setStakePercent3 !== undefined) invalidFields.push('setStakePercent3');

        if (invalidFields.length > 0) {
            return res.status(400).json({ error: `Permission not granted to change the value for field(s): ${invalidFields.join(', ')}` });
        }

        return res.status(200).json({ message: 'Admin control updated successfully', data: adminControl });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}



const getPermission = async (req, res) => {
    try {
        const admin = req.user;

        if (admin.userType !== 'admin') {
            return res.status(403).json({ error: 'Permission denied. Only admin can access this route.' });
        }
        const permission = await Permission.findOne({});
        if (!permission) {
            return res.status(400).json({ error: 'Permission not found' });
        }

        return res.status(200).json({ status: 'success', message: 'Permission fetched successfully', data: permission });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}



module.exports = { grantPermission, agentHandler, adminSetValue, getPermission, getPermission }
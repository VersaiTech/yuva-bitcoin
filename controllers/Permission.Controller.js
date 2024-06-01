const Permission = require('../models/permission.model');
const Admin = require('../models/AdminModel');
const AdminControl = require('../models/AdminControl.Model');
const Member = require('../models/memberModel');
const Joi = require('@hapi/joi');



const agentHandler = async (req, res) => {
    try {
        const admin = req.user;

        if (admin.userType !== 'admin') {
            return res.status(403).json({ error: 'Permission denied. Only admin can access this route.' });
        }

        const { admin_user_id } = req.params;
        const { isActive } = req.body;

        const checkAgent = await Admin.findOne({ admin_user_id: admin_user_id });
        if (!checkAgent) {
            return res.status(400).json({ error: 'Agent not found' });
        }

        const updateAgent = await Admin.updateOne({ admin_user_id: admin_user_id }, { isActive: isActive });
        if (!updateAgent) {
            return res.status(400).json({ error: 'Failed to update agent' });
        }

        return res.status(200).json({ status: true, message: 'Agent updated successfully' });
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
        //first check in admin that value.admin_user_id existsor not then check that admin_user_id is isActive is true then procced further else give error

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
        return res.status(201).json({ message: 'Permission granted successfully' });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}
module.exports = { grantPermission, agentHandler }
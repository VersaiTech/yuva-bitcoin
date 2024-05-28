const { ExternalSwap } = require("../models/ExternalSwap");
const { ExternalAdmin } = require("../models/ExternalAdminModel")
const Coin = require("../models/Coin");
const Joi = require("joi");
const Admin = require("../models/AdminModel");

function generateOrderID() {
    const prefix = 'YBODR'; // Prefix for the order ID
    const randomPart = Math.random().toString(36).substr(2, 5).toUpperCase(); // Random alphanumeric string
    const timestampPart = Date.now().toString(36).toUpperCase().slice(-5); // Timestamp converted to base36 string

    return `${prefix}-${randomPart}-${timestampPart}`;
}

async function createExternalSwap(req, res) {
    // Joi schema for request validation
    const ExternalSwapSchema = Joi.object({
        deposit_type: Joi.string().valid('usdt', 'bnb').required(),
        amount: Joi.number().required(),
        transaction_hash: Joi.string().required(),
        wallet_address: Joi.string().required(),
        status: Joi.string().valid('Pending', 'Approved', 'Rejected').default('Pending'),
        reason: Joi.string().allow(null, '')
    });

    try {
        // Validate request body
        const { error, value } = ExternalSwapSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        const { deposit_type, amount, transaction_hash, wallet_address, status, reason } = value;
        console.log("value", value)

        //if trasaction hash already existsgive error
        const existingExternalSwap = await ExternalSwap.findOne({ transaction_hash });
        if (existingExternalSwap) {
            return res.status(400).json({ error: 'Transaction hash already exists' });
        }

        //if order id already exists give error
        const existingOrderId = await ExternalSwap.findOne({ orderId: generateOrderID() });
        if (existingOrderId) {
            return res.status(400).json({ error: 'Order id already exists' });
        }

        const newExternalSwap = new ExternalSwap({
            deposit_type: value.deposit_type,
            amount: value.amount,
            transaction_hash: value.transaction_hash,
            wallet_address: value.wallet_address,
            orderId: generateOrderID(),
            status,
            reason
        });
        // Save ExternalSwap object to database
        const savedExternalSwap = await newExternalSwap.save();

        // If deposit type is 'usdt', add amount to Admin.usdt
        if (deposit_type === 'usdt') {
            await Admin.updateOne({}, { $inc: { usdt: amount } });
        }

        return res.status(200).json({ success: true, message: 'ExternalSwap created successfully', data: savedExternalSwap });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}


async function adminApproval(req, res) {
    const ExternalAdminSchema = Joi.object({
        status: Joi.string().required().valid('Pending', 'Approved', 'Rejected'),
        reason: Joi.string().allow(null, '')
    })

    try {
        const { error, value } = ExternalAdminSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }
        const { status, reason } = value;

        const isOrderIdExist = await ExternalSwap.findOne({ orderId: req.params.orderId });
        if (!isOrderIdExist) {
            return res.status(400).json({ error: 'Order id does not exist' });
        }

        const createAdminData = new ExternalAdmin({
            orderId: req.params.orderId,
            status: value.status,
            reason: value.reason
        })
        const saveAdminData = await createAdminData.save();

        const updatedExternalSwap = await ExternalSwap.updateOne({ orderId: req.params.orderId }, { $set: { status, reason } });
        return res.status(200).json({ success: true, message: 'ExternalSwap updated successfully', data: updatedExternalSwap, newData: saveAdminData });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}


async function getAllExternalSwap(req, res) {
    const Schema = Joi.object({
        page_number: Joi.number(),
        count: Joi.number(),
    });
    const { error, value } = Schema.validate(req.params);

    if (error) {
        return res.status(400).json({ status: false, error: error.details[0].message });
    }
    try {
        const page_number = value.page_number || 1;
        const count = value.count || 10;
        const offset = (page_number - 1) * count;

        const totalExternalSwap = await ExternalSwap.countDocuments();
        const externalSwap = await ExternalSwap.find()
            .sort({ createdAt: -1 })
            .skip(offset)
            .limit(count);

        if (!externalSwap || externalSwap.length === 0) {
            return res.status(200).json({ status: false, message: "No ExternalSwap found", externalSwap: [] });
        }

        return res.status(200).json({ status: true, message: "ExternalSwap found", externalSwap: externalSwap, totalExternalSwap: totalExternalSwap });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function findExternalSwap(req, res) {
    const Schema = Joi.object({
        orderId: Joi.string().allow(null, ''),
        wallet_address: Joi.string().allow(null, '')
    });
    const { error, value } = Schema.validate(req.body);
    if (error) {
        return res.status(400).json({ status: false, error: error.details[0].message });
    }
    try {
        let externalSwap = [];
        if(value.orderId){
            externalSwap = await ExternalSwap.findOne({ orderId: value.orderId });
        }else if(value.wallet_address){
            externalSwap = await ExternalSwap.find({ wallet_address: value.wallet_address });
        }else{
            return res.status(400).json({ status: false, message: "Please provide orderId or wallet_address" });
        }
        if (!externalSwap || externalSwap.length === 0) {
            return res.status(200).json({ status: false, message: "No ExternalSwap found", externalSwap: [] });
        }
        return res.status(200).json({ status: true, message: "ExternalSwap found", externalSwap: externalSwap });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}



module.exports = { createExternalSwap, adminApproval, getAllExternalSwap,findExternalSwap };

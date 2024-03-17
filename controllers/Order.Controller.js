const Order = require('../models/Order');
const Member = require('../models/memberModel');
const Admin = require('../models/AdminModel');
const TransactionHistory = require('../models/Transaction');
const Joi = require('joi');



//=============================================================================================================================//
//================================================selling section==============================================================//   
const createOrder = async (req, res) => {
    try {
        const userId = req.user.member_user_id;
        const member = await Member.findOne({ member_user_id: userId });
        if (!member) {
            return res.status(400).json({ error: 'User not found' });
        }

        // Extract data from request body
        const { coin, amount, exchange_currency, payment_method } = req.body;

        // Check if the member has sufficient balance of the specified coin
        let coinToDeductFrom;
        if (coin === 'yuva') {
            coinToDeductFrom = 'coins'; // Deduct from the general coins balance
        } else if (coin === 'usdt') {
            coinToDeductFrom = 'deposit_usdt'; // Deduct from the USDT deposit balance
        } else {
            return res.status(400).json({ error: 'Invalid coin type' });
        }

        if (member[coinToDeductFrom] < amount) {
            return res.status(400).json({ error: 'Insufficient balance' });
        }

        // Create a new order instance
        const order = new Order({
            userId,
            coin,
            amount,
            exchange_currency,
            payment_method,
            transactionType: 'order_sell'
        });

        // Calculate total
        order.total = await order.calculateTotal();

        // Deduct the amount from the member's balance
        member[coinToDeductFrom] -= amount;

        // Save the updated member object
        await member.save();

        // Find the admin record
        let admin = await Admin.findOne();

        // Ensure admin record exists
        if (!admin) {
            return res.status(400).json({ error: 'Admin not found' });
        }

        // Your existing logic for admin handling...
        // Check if the coin field exists in the admin document
        if (!admin[coin]) {
            // If the coin field does not exist, create it with the value of the deducted amount
            admin.set(coin, amount);
        } else {
            // If the coin field exists, add the deducted amount to its existing value
            admin.set(coin, admin[coin] + amount);
        }

        // Save the updated admin object
        await admin.save();

        // Save the order to the database
        await order.save();

        // Create a new TransactionHistory document for the order
        const transactionHistory = new TransactionHistory({
            orderId: order._id,
            userId: member.member_user_id,
            adminId: admin.admin_user_id,
            coin,
            amount,
            transactionType: 'order_sell' // This indicates it's a transaction related to an order
        });

        // Save the transaction history
        await transactionHistory.save();

        res.status(201).json({ message: 'Order created successfully', order });
    } catch (error) {
        console.error('Error creating order:', error);
        res.status(500).json({ error: 'Failed to create order' });
    }
};



// const createOrder = async (req, res) => {
//     try {
//         const userId = req.user.member_user_id;
//         const member = await Member.findOne({ member_user_id: userId });
//         if (!member) {
//             return res.status(400).json({ error: 'User not found' });
//         }

//         // Extract data from request body
//         const { coin, amount, exchange_currency, payment_method } = req.body;

//         // Check if the member has sufficient balance of the specified coin
//         if (member.coins < amount) {
//             return res.status(400).json({ error: 'Insufficient balance' });
//         }

//         // Create a new order instance
//         const order = new Order({
//             userId,
//             coin,
//             amount,
//             exchange_currency,
//             payment_method,
//             transactionType: 'order_sell'
//         });

//         // Calculate total
//         order.total = await order.calculateTotal();

//         // Deduct the amount from the member's balance
//         member.coins -= amount;

//         // Save the updated member object
//         await member.save();

//         // Find the admin record (assuming there's an Admin model)
//         let admin = await Admin.findOne();

//         // Ensure admin record exists
//         if (!admin) {
//             return res.status(400).json({ error: 'Admin not found' });
//         }

//         // Check if the coin field exists in the admin document
//         if (!admin[coin]) {
//             // If the coin field does not exist, create it with the value of the deducted amount
//             admin.set(coin, amount);
//         } else {
//             // If the coin field exists, add the deducted amount to its existing value
//             admin.set(coin, admin[coin] + amount);
//         }

//         // Save the updated admin object
//         await admin.save();

//         // Save the order to the database
//         await order.save();

//         // Create a new TransactionHistory document for the order
//         const transactionHistory = new TransactionHistory({
//             orderId: order._id,
//             userId: member.member_user_id,
//             adminId: admin.admin_user_id,
//             coin,
//             amount,
//             transactionType: 'order_sell' // This indicates it's a transaction related to an order
//         });

//         // Save the transaction history
//         await transactionHistory.save();

//         res.status(201).json({ message: 'Order created successfully', order });
//     } catch (error) {
//         console.error('Error creating order:', error);
//         res.status(500).json({ error: 'Failed to create order' });
//     }
// };

//1st
// const updateOrder = async (req, res) => {
//     try {
//         // Extract data from request body
//         const { orderId, userId, coin, amount, exchange_currency, payment_method, active, transactionType } = req.body;

//         // Find the order by orderId
//         let order = await Order.findById(orderId);
//         if (!order) {
//             return res.status(404).json({ error: 'Order not found' });
//         }

//         // Find the member by userId
//         const member = await Member.findOne({ member_user_id: userId });
//         if (!member) {
//             return res.status(400).json({ error: 'User not found' });
//         }

//         // Calculate total of the updated order
//         const newTotal = amount * exchange_currency;

//         // Check if the member has sufficient balance for the updated order
//         if (amount > member.coins) {
//             return res.status(400).json({ error: 'Insufficient balance' });
//         }

//         // Calculate the difference in total amount compared to the previous order
//         const totalDifference = newTotal - order.total;

//         // Update order fields
//         order.userId = userId;
//         order.coin = coin;
//         order.amount = amount;
//         order.exchange_currency = exchange_currency;
//         order.payment_method = payment_method;
//         order.active = active;
//         order.total = newTotal;
//         order.transactionType = transactionType;

//         // Deduct the amount from member's coins
//         member.coins -= totalDifference;

//         // Save the updated member object
//         await member.save();

//         // Save the updated order
//         order = await order.save();

//         res.status(200).json({ message: 'Order updated successfully', order });
//     } catch (error) {
//         console.error('Error updating order:', error);
//         res.status(500).json({ error: 'Failed to update order' });
//     }
// };

// Final Update controller
const updateOrder = async (req, res) => {
    try {
        // Extract data from request body
        const { orderId, userId, coin, amount, exchange_currency, payment_method, active, transactionType } = req.body;

        // Find the order by orderId
        let order = await Order.findById(orderId);
        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }

        // Find the member by userId
        const member = await Member.findOne({ member_user_id: userId });
        if (!member) {
            return res.status(400).json({ error: 'User not found' });
        }

        // Calculate total of the updated order
        const newTotal = amount * exchange_currency;

        // Check if the member has sufficient balance for the updated order
        if (amount > member.coins) {
            return res.status(400).json({ error: 'Insufficient balance' });
        }

        // Calculate the difference in amount compared to the previous order
        const amountDifference = amount - order.amount;

        // Update order fields
        order.userId = userId;
        order.coin = coin;
        order.amount = amount;
        order.exchange_currency = exchange_currency;
        order.payment_method = payment_method;
        order.active = active;
        order.total = newTotal;
        order.transactionType = transactionType;

        // Deduct the difference from member's coins
        member.coins -= amountDifference;

        // Save the updated member object
        await member.save();

        // Find the admin record (assuming there's an Admin model)
        let admin = await Admin.findOne();

        // Ensure admin record exists
        if (!admin) {
            return res.status(400).json({ error: 'Admin not found' });
        }

        // Check if the coin field exists in the admin document
        if (!admin[coin]) {
            // If the coin field does not exist, create it with the value of the deducted amount
            admin.set(coin, amountDifference);
        } else {
            // If the coin field exists, add the deducted amount to its existing value
            admin.set(coin, admin[coin] + amountDifference);
        }

        // Save the updated admin object
        await admin.save();

        // Save the updated order
        order = await order.save();

        res.status(200).json({ message: 'Order updated successfully', order });
    } catch (error) {
        console.error('Error updating order:', error);
        res.status(500).json({ error: 'Failed to update order' });
    }
};

// 2nd number
// const updateOrder = async (req, res) => {
//     try {
//         // Extract data from request body
//         const { orderId, userId, coin, amount, exchange_currency, payment_method, active, transactionType } = req.body;

//         // Find the order by orderId
//         let order = await Order.findById(orderId);
//         if (!order) {
//             return res.status(404).json({ error: 'Order not found' });
//         }

//         // Find the member by userId
//         const member = await Member.findOne({ member_user_id: userId });
//         if (!member) {
//             return res.status(400).json({ error: 'User not found' });
//         }

//         // Calculate total of the updated order
//         const newTotal = amount * exchange_currency;

//         // Check if the member has sufficient balance for the updated order
//         if (amount > member.coins) {
//             return res.status(400).json({ error: 'Insufficient balance' });
//         }

//         // Calculate the difference in amount compared to the previous order
//         const amountDifference = amount - order.amount;

//         // Update order fields
//         order.userId = userId;
//         order.coin = coin;
//         order.amount = amount;
//         order.exchange_currency = exchange_currency;
//         order.payment_method = payment_method;
//         order.active = active;
//         order.total = newTotal;
//         order.transactionType = transactionType;

//         // Deduct the difference from member's coins
//         member.coins -= amountDifference;

//         // Save the updated member object
//         await member.save();

//         // Save the updated order
//         order = await order.save();

//         res.status(200).json({ message: 'Order updated successfully', order });
//     } catch (error) {
//         console.error('Error updating order:', error);
//         res.status(500).json({ error: 'Failed to update order' });
//     }
// };
const getAllOrder = async (req, res) => {
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
        const toalOrders = await Order.find();
        // Fetch tasks for the user with sorting and pagination
        const order = await Order.find()
            .sort({ createdAt: -1 })
            .skip(offset)
            .limit(count);
        // Find all orders
        const orders = await Order.find();
        if (!order || order.length === 0) {
            return res.status(200).json({
                status: false,
                message: "No order ",
                toalOrders,
                order: [],
            });
        }

        return res.status(200).json({
            status: true,
            message: "Orders Found",
            totalOrders: toalOrders.length,
            order: order,

        });
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({ error: 'Failed to fetch orders' });
    }
};

const getAllOrderForOneUSer = async (req, res) => {
    const Schema = Joi.object({
        page_number: Joi.number(),
        count: Joi.number(),
    });
    const { error, value } = Schema.validate(req.params);

    if (error) {
        return res.status(400).json({ status: false, error: error.details[0].message });
    }
    try {
        const userId = req.user.member_user_id;
        const page_number = value.page_number || 1;
        const count = value.count || 10;
        const offset = (page_number - 1) * count;
        const toalOrders = await Order.find({ userId, transactionType: "order_sell" });
        // Fetch tasks for the user with sorting and pagination
        const order = await Order.find({ userId, transactionType: "order_sell" })
            .sort({ createdAt: -1 })
            .skip(offset)
            .limit(count);
        // Find all orders
        // const orders = await Order.find({ userId, transactionType: "order_sell" });
        if (!order || order.length === 0) {
            return res.status(200).json({
                status: false,
                message: "No order ",
                toalOrders,
                order: [],
            });
        }

        return res.status(200).json({
            status: true,
            message: "Orders Found",
            totalOrders: toalOrders.length,
            order: order,

        });
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({ error: 'Failed to fetch orders' });
    }
};


const getOrdersForAdminForOneUser = async (req, res) => {
    const Schema = Joi.object({
        userId: Joi.string().required(), // Expecting userId in the request params
        page_number: Joi.number(),
        count: Joi.number(),
    });
    const { error, value } = Schema.validate(req.params); // Corrected: req.params

    if (error) {
        return res.status(400).json({ status: false, error: error.details[0].message });
    }

    try {
        const { userId, page_number = 1, count = 10 } = value;
        const offset = (page_number - 1) * count;

        // Fetch total orders count for the user
        const totalOrders = await Order.find({ userId }).countDocuments();

        // Fetch orders for the user with sorting and pagination
        const orders = await Order.find({ userId })
            .sort({ createdAt: -1 })
            .skip(offset)
            .limit(count);

        if (!orders || orders.length === 0) {
            return res.status(200).json({
                status: false,
                message: "No orders found for the user",
                totalOrders: 0,
                orders: [],
            });
        }

        return res.status(200).json({
            status: true,
            message: "Orders found for the user",
            totalOrders,
            orders,
        });
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({ error: 'Failed to fetch orders' });
    }
};

// const deleteOrder = async (req, res) => {
//     try {
//         // Extract data from request body
//         const { orderId, userId } = req.body;

//         // Find the order by orderId
//         const order = await Order.findById(orderId);
//         if (!order) {
//             return res.status(404).json({ error: 'Order not found' });
//         }

//         // Check if the order belongs to the user
//         if (order.userId !== userId) {
//             return res.status(403).json({ error: 'You are not authorized to delete this order' });
//         }

//         // Find the member by userId
//         const member = await Member.findOne({ member_user_id: userId });
//         if (!member) {
//             return res.status(400).json({ error: 'User not found' });
//         }

//         // Add the order's amount back to the member's coins
//         member.coins += order.amount;

//         // Save the updated member object
//         await member.save();

//         // Find the admin record (assuming there's an Admin model)
//         let admin = await Admin.findOne();

//         // Ensure admin record exists
//         if (!admin) {
//             return res.status(400).json({ error: 'Admin not found' });
//         }

//         // Check if the coin field exists in the admin document
//         if (admin[order.coin]) {
//             // If the coin field exists, deduct the amount from its existing value
//             admin.set(order.coin, admin[order.coin] - order.amount);
//             // Save the updated admin object
//             await admin.save();
//         }

//         // Delete the order from the database
//         await Order.findByIdAndDelete(orderId);

//         res.status(200).json({ message: 'Order deleted successfully' });
//     } catch (error) {
//         console.error('Error deleting order:', error);
//         res.status(500).json({ error: 'Failed to delete order' });
//     }
// };


//=======================================below is main deletion with restriction =============================================//
// const deleteOrder = async (req, res) => {
//     try {
//         // Extract data from request body
//         const { orderId, userId } = req.body;

//         // Find the order by orderId
//         const order = await Order.findById(orderId);
//         if (!order) {
//             return res.status(404).json({ error: 'Order not found' });
//         }

//         // Check if the order belongs to the user
//         if (order.userId !== userId) {
//             return res.status(403).json({ error: 'You are not authorized to delete this order' });
//         }

//         // Find the member by userId
//         const member = await Member.findOne({ member_user_id: userId });
//         if (!member) {
//             return res.status(400).json({ error: 'User not found' });
//         }

//         // Get the current date in YYYY-MM-DD format
//         const currentDate = new Date().toISOString().split('T')[0];

//         // Check if the current date is different from the last deletion date
//         if (member.lastDeletionDate && member.lastDeletionDate.toISOString().split('T')[0] !== currentDate) {
//             // If it's a new day, reset the deletion count and update the last deletion date
//             member.deletionCount = 0;
//             member.lastDeletionDate = new Date();
//         }

//         // Check if the user has exceeded the daily deletion limit (3 deletions per day)
//         if (member.deletionCount >= 3) {
//             return res.status(403).json({ error: 'You have reached the maximum daily deletion limit. Please try again tomorrow.' });
//         }

//         // Add the order's amount back to the member's coins
//         member.coins += order.amount;

//         // Increment the deletion count after successfully deleting an order
//         member.deletionCount++;

//         // Save the updated member object
//         await member.save();

//         // Find the admin record (assuming there's an Admin model)
//         let admin = await Admin.findOne();

//         // Ensure admin record exists
//         if (!admin) {
//             return res.status(400).json({ error: 'Admin not found' });
//         }

//         // Check if the coin field exists in the admin document
//         if (admin[order.coin]) {
//             // If the coin field exists, deduct the amount from its existing value
//             admin.set(order.coin, admin[order.coin] - order.amount);
//             // Save the updated admin object
//             await admin.save();
//         }

//         // Delete the order from the database
//         await Order.findByIdAndDelete(orderId);

//         res.status(200).json({ message: 'Order deleted successfully' });
//     } catch (error) {
//         console.error('Error deleting order:', error);
//         res.status(500).json({ error: 'Failed to delete order' });
//     }
// };

const deleteOrder = async (req, res) => {
    try {
        // Extract data from request body
        const { orderId, userId } = req.body;

        // Find the order by orderId
        const order = await Order.findById(orderId);
        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }

        // Find the member by userId
        const member = await Member.findOne({ member_user_id: userId });
        if (!member) {
            return res.status(400).json({ error: 'User not found' });
        }

        // Get the current date
        const currentDate = new Date();
        // Get the last deletion date from the member's record
        const lastDeletionDate = member.lastDeletionDate || new Date(0); // If lastDeletionDate is not set, default to epoch

        // Compare dates to check if it's a new day
        if (!isSameDay(currentDate, lastDeletionDate)) {
            // If it's a new day, reset the deletion count and update the last deletion date
            member.deletionCount = 0;
            member.lastDeletionDate = currentDate;
        }

        // Check if the user has exceeded the daily deletion limit (3 deletions per day)
        if (member.deletionCount >= 3) {
            return res.status(403).json({ error: 'You have reached the maximum daily deletion limit. Please try again tomorrow.' });
        }

        // Increment the deletion count after successfully deleting an order
        member.deletionCount++;

        // Save the updated member object
        await member.save();

        // Delete the order from the database
        await Order.findByIdAndDelete(orderId);

        res.status(200).json({ message: 'Order deleted successfully' });
    } catch (error) {
        console.error('Error deleting order:', error);
        res.status(500).json({ error: 'Failed to delete order' });
    }
};

// Function to check if two dates are the same day
function isSameDay(date1, date2) {
    return date1.getFullYear() === date2.getFullYear() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getDate() === date2.getDate();
}

module.exports = deleteOrder;




//===================================================================================================================================//

//==================================================Buying Orders=============================================================//
module.exports = {
    createOrder, updateOrder, getAllOrder, getAllOrderForOneUSer, getOrdersForAdminForOneUser, deleteOrder
};

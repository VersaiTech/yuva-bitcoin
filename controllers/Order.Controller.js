const Order = require('../models/Order');
const Member = require('../models/memberModel');
const Admin = require('../models/AdminModel');
const TransactionHistory = require('../models/Transaction');

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
//             payment_method
//         });

//         // Calculate total
//         order.total = await order.calculateTotal();

//         // Deduct the amount from the member's balance
//         member.coins -= amount;

//         // Save the updated member object
//         await member.save();

//         // Find the admin record (assuming there's an Admin model)
//         let admin = await Admin.findOne();
//         console.log(admin)

//         // Ensure admin record exists
//         if (!admin) {
//             return res.status(400).json({ error: 'Admin not found' });
//         }

//         // Update the admin's data with the deducted amount based on coin type
//         if (coin === 'yuva') {
//             admin.yuva += amount;
//         } else if (coin === 'usdt') {
//             admin.usdt += amount;
//         }

//         // Save the updated admin object
//         await admin.save();

//         // Save the order to the database
//         await order.save();

//         res.status(201).json({ message: 'Order created successfully', order });
//     } catch (error) {
//         console.error('Error creating order:', error);
//         res.status(500).json({ error: 'Failed to create order' });
//     }
// };

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
        if (member.coins < amount) {
            return res.status(400).json({ error: 'Insufficient balance' });
        }

        // Create a new order instance
        const order = new Order({
            userId,
            coin,
            amount,
            exchange_currency,
            payment_method
        });

        // Calculate total
        order.total = await order.calculateTotal();

        // Deduct the amount from the member's balance
        member.coins -= amount;

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



module.exports = {
    createOrder
};

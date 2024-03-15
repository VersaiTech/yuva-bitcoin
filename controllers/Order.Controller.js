const Order = require('../models/Order');
const Member = require('../models/memberModel');

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
        if (member[coin] < amount) {
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
        member[coin] -= amount;

        // Save the updated member object
        await member.save();

        // Save the order to the database
        await order.save();

        res.status(201).json({ message: 'Order created successfully', order });
    } catch (error) {
        console.error('Error creating order:', error);
        res.status(500).json({ error: 'Failed to create order' });
    }
};


module.exports = {
    createOrder
};

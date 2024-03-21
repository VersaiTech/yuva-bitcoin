const { Support, Reply } = require('../models/Support');
const Member = require('../models/memberModel');
const nodemailer = require('nodemailer');

// Function to create a support message
const createSupport = async (req, res) => {
    try {
        const userId = req.user.userId;
        const { name, twitterId, email, message } = req.body;

        // Check if user exists in the Member schema
        const user = await Member.findOne({ userId: userId });

        if (!user) {
            return res.status(404).json({ error: 'User not found.' });
        }
        console.log(user.member_name)
        // Check if the user's Twitter ID and Name matches the Twitter ID and Name from the request body
        if (name && user.member_name !== name) {
            return res.status(400).json({ error: 'Name does not match.' });
        }

        if (twitterId && user.twitterId !== twitterId) {
            return res.status(400).json({ error: 'Twitter ID does not match.' });
        }

        console.log(user.member_user_id)
        // Create support message
        const supportMessage = new Support({
            name: user.member_name, // Use the name from request body
            twitterId: user.twitterId,
            email,
            userId: user.member_user_id,
            message
        });

        // Save support message
        await supportMessage.save();

        // Send email to admin
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: '191260107039setice@gmail.com',
                pass: 'pvvw lqvk axxs kwha'
            }
        });

        const mailOptions = {
            from: email, // Use the email from request body
            to: '191260107039setice@gmail.com', // Admin's email
            subject: 'New Support Message',
            text: `Name: ${name}\nTwitter ID: ${twitterId}\nEmail: ${email}\nMessage: ${message}`
        };

        // Send email to admin
        await transporter.sendMail(mailOptions);

        return res.status(201).json({ message: 'Support message sent successfully.', supportMessage });
    } catch (error) {
        console.error('Error creating support message:', error);
        res.status(500).json({ error: 'Internal server error.' });
    }
};


// Function to reply to a support message
const adminReplyToUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const { message } = req.body;

        // Fetch the latest support message from the user
        const latestMessage = await Support.findOne({ userId }).sort({ createdAt: -1 });

        if (!latestMessage) {
            return res.status(404).json({ error: 'No message found for the user.' });
        }

        // Send reply email to the user
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: '191260107039setice@gmail.com',
                pass: 'pvvw lqvk axxs kwha'
            }
        });

        const mailOptions = {
            from: '191260107039setice@gmail.com',
            to: latestMessage.email, // User's email
            subject: 'Reply to Your Support Message',
            text: message
        };

        // Send email to the user
        await transporter.sendMail(mailOptions);

        // Save admin reply in the Reply collection
        const reply = new Reply({
            name: latestMessage.name,
            twitterId: latestMessage.twitterId,
            email: latestMessage.email,
            userId: latestMessage.userId,
            user_message: latestMessage.message,
            message: message
        });
        await reply.save();

        // Update support message with admin reply
        latestMessage.adminReply = message;
        latestMessage.replied = true;
        await latestMessage.save();

        return res.status(200).json({ message: 'Reply sent successfully.' });
    } catch (error) {
        console.error('Error replying to user message:', error);
        res.status(500).json({ error: 'Internal server error.' });
    }
};


module.exports = {
    createSupport, adminReplyToUser
}
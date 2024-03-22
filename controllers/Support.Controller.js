const { Support, Reply } = require('../models/Support');
const Member = require('../models/memberModel');
const nodemailer = require('nodemailer');
const Joi = require('joi')

// Function to create a support message
// const createSupport = async (req, res) => {
//     try {
//         const userId = req.user.userId;
//         const { name, twitterId, email, message } = req.body;

//         // Check if user exists in the Member schema
//         const user = await Member.findOne({ userId: userId });

//         if (!user) {
//             return res.status(404).json({ error: 'User not found.' });
//         }
//         console.log(user.member_name)
//         // Check if the user's Twitter ID and Name matches the Twitter ID and Name from the request body
//         if (name && user.member_name !== name) {
//             return res.status(400).json({ error: 'Name does not match.' });
//         }

//         if (twitterId && user.twitterId !== twitterId) {
//             return res.status(400).json({ error: 'Twitter ID does not match.' });
//         }

//         console.log(user.member_user_id)
//         // Create support message
//         const supportMessage = new Support({
//             name: user.member_name, // Use the name from request body
//             twitterId: user.twitterId,
//             email,
//             userId: user.member_user_id,
//             message
//         });

//         // Save support message
//         await supportMessage.save();

//         // Send email to admin
//         const transporter = nodemailer.createTransport({
//             service: 'gmail',
//             auth: {
//                 user: '191260107039setice@gmail.com',
//                 pass: 'pvvw lqvk axxs kwha'
//             }
//         });

//         const mailOptions = {
//             from: email, // Use the email from request body
//             to: '191260107039setice@gmail.com', // Admin's email
//             subject: 'New Support Message',
//             text: `Name: ${name}\nTwitter ID: ${twitterId}\nEmail: ${email}\nMessage: ${message}`
//         };

//         // Send email to admin
//         await transporter.sendMail(mailOptions);

//         return res.status(201).json({ message: 'Support message sent successfully.', supportMessage });
//     } catch (error) {
//         console.error('Error creating support message:', error);
//         res.status(500).json({ error: 'Internal server error.' });
//     }
// };
const createSupport = async (req, res) => {
    try {
        const userId = req.user.member_user_id;
        const { name, twitterId, email, message } = req.body;
        console.log(userId)
        // Check if user exists in the Member schema
        const member = await Member.findOne({ member_user_id: userId });

        if (!member) {
            return res.status(404).json({ error: 'User not found.' });
        }
        if (name && member.member_name !== name) {
            return res.status(400).json({ error: 'Name does not match.' });
        }
        // Check if the provided Twitter ID matches the user's Twitter ID
        if (twitterId && member.twitterId !== twitterId) {
            return res.status(400).json({ error: 'Provided Twitter ID does not match user\'s Twitter ID.' });
        }

        // Additional checks for other fields can be added here if needed

        // Create support message
        const supportMessage = new Support({
            name: name, // Use the provided name
            twitterId: twitterId, // Use the provided Twitter ID
            email: email,
            userId: userId, // Use the user's ID from authentication
            message: message
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
            from: email,
            to: '191260107039setice@gmail.com',
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



const getAllSupport = async (req, res) => {
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

        const totalSupport = await Support.countDocuments();
        const supportMessages = await Support.find()
            .sort({ createdAt: -1 })
            .skip(offset)
            .limit(count);

        if (!supportMessages || supportMessages.length === 0) {
            return res.status(200).json({
                status: false, message: 'No support messages found', supportMessages: [], totalSupport
            });
        }
        res.status(200).json({ status: true, message: 'Support messages fetched successfully', totalSupport, supportMessages, supportMessages });
    } catch (error) {
        console.error('Error fetching support messages:', error);
        res.status(500).json({ error: 'Internal server error.' });
    }
};

const getSupportForOneUser = async (req, res) => {
    const Schema = Joi.object({
        page_number: Joi.number(),
        count: Joi.number(),
        userId: Joi.string().required(),
    });
    const { error, value } = Schema.validate(req.params);
    if (error) {
        return res.status(400).json({ status: false, error: error.details[0].message });
    }
    try {
        const { page_number, count, userId } = value;
        const pageNumber = page_number || 1;
        const itemCount = count || 10;
        const offset = (pageNumber - 1) * itemCount;

        const totalSupport = await Support.countDocuments({ userId });
        const supportMessages = await Support.find({ userId })
            .sort({ createdAt: -1 })
            .skip(offset)
            .limit(itemCount);

        if (!supportMessages || supportMessages.length === 0) {
            return res.status(200).json({
                status: false, message: 'No support messages found', supportMessages: [], totalSupport
            });
        }

        res.status(200).json({ status: true, message: 'Support messages fetched successfully', totalSupport, supportMessages });
    } catch (error) {
        console.error('Error fetching support messages:', error);
        res.status(500).json({ error: 'Internal server error.' });
    }
};

const getUserSupport = async (req, res) => {
    const Schema = Joi.object({
        page_number: Joi.number(),
        count: Joi.number(),
    });
    const { error, value } = Schema.validate(req.params);
    if (error) {
        return res.status(400).json({ status: false, error: error.details[0].message });
    }
    try {
        const { page_number, count } = value;
        const pageNumber = page_number || 1;
        const itemCount = count || 10;
        const offset = (pageNumber - 1) * itemCount;
        const userId = req.user.member_user_id;

        const totalSupport = await Support.countDocuments({ userId: userId });
        const supportMessages = await Support.find({ userId }).sort({ createdAt: -1 })
            .skip(offset)
            .limit(itemCount);
        if (!supportMessages || supportMessages.length === 0) {
            return res.status(200).json({
                status: false, message: 'No support messages found', supportMessages: [], totalSupport
            });
        }
        res.status(200).json({ status: true, message: 'Support messages fetched successfully', totalSupport, supportMessages });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = {
    createSupport, adminReplyToUser, getAllSupport, getSupportForOneUser,getUserSupport
}
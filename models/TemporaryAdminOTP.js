const mongoose = require('mongoose');

// Define the schema for TemporaryAdminOTP
const temporaryAdminOTPSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    otp: {
        type: String,
        required: true
    },
    expiry: {
        type: Date,
        default: Date.now,
        index: { expires: 10 * 60 * 1000 } // expire in 10 minutes
    }
});

// Create the model
const TemporaryAdminOTP = mongoose.model('TemporaryAdminOTP', temporaryAdminOTPSchema);

// Export the model
module.exports = TemporaryAdminOTP;


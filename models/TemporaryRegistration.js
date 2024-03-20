const mongoose = require('mongoose');

const TemporaryRegistrationSchema = new mongoose.Schema({
  email: { type: String, required: true },
  otp: { type: String, required: true },
  registrationData: { type: Object, required: true },
}, { timestamps: true });

const TemporaryRegistration = mongoose.model('TemporaryRegistration', TemporaryRegistrationSchema);

module.exports = TemporaryRegistration;

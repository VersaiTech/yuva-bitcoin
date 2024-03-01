const mongoose = require('mongoose');

// Function to get the current date without the time component
function getCurrentDate() {
  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0); // Set hours, minutes, seconds, and milliseconds to 0
  return currentDate;
}

const withdrawSchema = new mongoose.Schema({
  member_user_id: { type: String, required: true },
  member_name: { type: String },
  wallet_address: { type: String, required: true, ref: 'Member' },
  with_amt: { type: Number, required: true },
  with_date: { type: Date, default: Date.now },
  with_referrance: { type: String, required: true, unique: true },
  status: { type: String, enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending' },
  processing_date: { type: Date },
  processed_by: { type: String },
  remarks: { type: String },
  transection_hash: { type: String, required: true },
});

const Withdraw = mongoose.model('Withdraw', withdrawSchema);

module.exports = Withdraw;

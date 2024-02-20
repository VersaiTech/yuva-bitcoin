const mongoose = require('mongoose');

const withdrawSchema = new mongoose.Schema({
  member_user_id: { type: String, required: true },
  member_name: { type: String },
  with_amt: { type: Number, required: true },
  with_date: { type: Date, default: Date.now },
  with_referrance: { type: String, required: true, unique: true },
  status: { type: String, enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending' },
  processing_date: { type: Date },
  processed_by: { type: String },
  remarks: { type: String },
});

const Withdraw = mongoose.model('Withdraw', withdrawSchema);

module.exports = Withdraw;

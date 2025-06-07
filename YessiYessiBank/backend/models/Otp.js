const mongoose = require('mongoose');

const otpSchema = new mongoose.Schema({
  phoneNumber: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 300, // Le document expirera après 300 secondes (5 minutes)
  },
  isUsed: {
    type: Boolean,
    default: false,
  },
});

const Otp = mongoose.model('Otp', otpSchema);

module.exports = Otp;

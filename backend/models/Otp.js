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
  expiresAt: {
    type: Date,
    required: true,
    // L'index TTL supprimera automatiquement le document après expiration
    index: {expires: '5m'},
  },
  isUsed: {
    type: Boolean,
    default: false,
  },
});

const Otp = mongoose.model('Otp', otpSchema);

module.exports = Otp;

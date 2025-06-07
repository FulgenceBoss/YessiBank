const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// @route   POST /api/auth/send-otp
// @desc    Envoyer un OTP à un numéro de téléphone
// @access  Public
router.post('/send-otp', authController.sendOtp);

// @route   POST /api/auth/verify-otp
// @desc    Vérifier un OTP et retourner un JWT
// @access  Public
router.post('/verify-otp', authController.verifyOtp);

module.exports = router;

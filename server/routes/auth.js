const express = require('express');
const router = express.Router();
const { register, login, verifyOTP, sendLoginOTP, verifyLoginOTP } = require('../controllers/authController');

router.post('/register', register);
router.post('/login', login);
router.post('/verify-otp', verifyOTP);
router.post('/send-login-otp', sendLoginOTP);
router.post('/verify-login-otp', verifyLoginOTP);

module.exports = router;
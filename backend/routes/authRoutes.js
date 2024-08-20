const express = require('express');
const { register, verifyOtp, login, verifyLoginOtp } = require('../controllers/authController');

const router = express.Router();

router.post('/register', register);
router.post('/verify-otp', verifyOtp);
router.post('/login', login);
router.post('/verify-login-otp', verifyLoginOtp);

module.exports = router;

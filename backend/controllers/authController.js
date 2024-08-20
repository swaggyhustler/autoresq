const User = require('../models/User');
const Otp = require('../models/Otp');
const generateOtp = require('../utils/otpGenerator');
const bcrypt = require('bcryptjs');
const sendOtp = require('../utils/smsService');

exports.register = async (req, res) => {
  const { mobile } = req.body;

  const userExists = await User.findOne({ mobile });
  if (userExists) {
    return res.status(400).json({ message: 'User already exists' });
  }

  const otp = generateOtp();
  const otpEntry = new Otp({ mobile, otp });
  await otpEntry.save();

  // Send OTP via SMS
  try {
    await sendOtp(mobile, otp);
    res.status(200).json({ message: 'OTP sent to mobile number' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to send OTP' });
  }
};

exports.verifyOtp = async (req, res) => {
  const { mobile, otp, name, email, password } = req.body;

  const otpEntry = await Otp.findOne({ mobile, otp });
  if (!otpEntry) {
    return res.status(400).json({ message: 'Invalid OTP' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ name, email, mobile, password: hashedPassword });
  await user.save();

  res.status(201).json({ message: 'User registered successfully' });
};

exports.login = async (req, res) => {
  const { mobile } = req.body;

  const user = await User.findOne({ mobile });
  if (!user) {
    return res.status(400).json({ message: 'User not found' });
  }

  const otp = generateOtp();
  const otpEntry = new Otp({ mobile, otp });
  await otpEntry.save();

  // Send OTP via SMS
  try {
    await sendOtp(mobile, otp);
    res.status(200).json({ message: 'OTP sent to mobile number' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to send OTP' });
  }
};

exports.verifyLoginOtp = async (req, res) => {
  const { mobile, otp } = req.body;

  const otpEntry = await Otp.findOne({ mobile, otp });
  if (!otpEntry) {
    return res.status(400).json({ message: 'Invalid OTP' });
  }

  const user = await User.findOne({ mobile });
  res.status(200).json({ message: 'Login successful', user });
};

import express from 'express';
import { registerUser, login, registerMechanic, checkAuth, verifyEmail, logout } from '../controllers/authController.js';
import { verifyToken } from '../middlewares/verifyToken.js';

const router = express.Router();

router.post('/register/user', registerUser);
router.post('/register/mechanic', registerMechanic);
router.post('/login', login);
router.get('/check-auth', verifyToken, checkAuth);
router.post('/verify-email', verifyEmail);
router.get('/logout', logout);

export default router;

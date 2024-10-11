import express from 'express';
import { registerUser, login, registerMechanic } from '../controllers/authController.js';

const router = express.Router();

router.post('/register/user', registerUser);
router.post('/register/mechanic', registerMechanic);
router.post('/login', login);

export default router;

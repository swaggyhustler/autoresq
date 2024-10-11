// const express = require('express');
// const connectDB = require('./config/db');
// const authRoutes = require('./routes/authRoutes');
// const cors=require('cors');
// const bodyParser = require("body-parser");
import express from 'express';
import connectDB from './config/db.js';
import authRoutes from "./routes/authRoutes.js";
import cors from 'cors';
import mechLocRoutes from './routes/mechLocRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import bookingRoutes from './routes/bookingRoutes.js';

const app = express();
// Connect Database
await connectDB();
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));
// Init Middleware
app.use(express.json());

// Define Routes
app.use('/api/auth', authRoutes);
app.use('/api', mechLocRoutes);
app.use('/admin', adminRoutes);
app.use('/api', bookingRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

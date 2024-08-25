// const express = require('express');
// const connectDB = require('./config/db');
// const authRoutes = require('./routes/authRoutes');
// const cors=require('cors');
// const bodyParser = require("body-parser");
import express from 'express';
import connectDB from './config/db.js';
import authRoutes from "./routes/authRoutes.js";
import cors from 'cors';
import bodyParser from 'body-parser';
import addRoutes from './routes/mechLocRoutes.js';

const app = express();
// Connect Database
connectDB();
app.use(cors());
// Init Middleware
app.use(express.json({ extended: false }));
app.use(bodyParser.json()); // For JSON payloads
app.use(bodyParser.urlencoded({ extended: true })); // For URL-encoded payloads

// Define Routes
app.use('/api/auth', authRoutes);
app.use('/add', addRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

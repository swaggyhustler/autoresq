import express from 'express';
import {addMechLoc, getMechLoc} from '../controllers/mechLocationController.js';

const router=express.Router();

router
.post("/addMechLocation", addMechLoc)
.post("/getMechLocation", getMechLoc);
export default router;

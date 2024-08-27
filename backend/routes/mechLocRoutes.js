import express from 'express';
import {addMechLoc, getMechLoc} from '../controllers/mechLocationController.js';

const router=express.Router();

router
.post("/addMechLocation", addMechLoc)
.get("/getMechLocation", getMechLoc);
export default router;

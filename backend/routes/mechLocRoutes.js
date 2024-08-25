import express from 'express';
import {addMechLoc} from '../controllers/mechLocationController.js';

const router=express.Router();

router.post("/mechLocation", addMechLoc);

export default router;

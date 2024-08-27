import {getUser, modifyUser} from "../controllers/adminController.js";
import express from "express"; 

const router=express.Router();

router
.get("/getUser/:email", getUser)
.post("/modifyUser", modifyUser)

export default router;


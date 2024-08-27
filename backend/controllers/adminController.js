import User from "../models/User.js";
import MechLoc from "../models/MechLoc.js";

const getUser=async (req, res)=>{
    const {email}=req.params;
    const data= await User.findOne({email: email});
    res.status(200).json({data: data});
}

const modifyUser= async (req, res)=>{
    const {name, mobile, password} = req.body;
    const data=User.updateOne({email: req.params}, {name, mobile, password});
    res.status(200).json({updatedData: data});
}

export {getUser, modifyUser};
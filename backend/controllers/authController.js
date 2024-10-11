import Mechanic from '../models/Mechanic.js';
import User from '../models/User.js';
import { sendVerificationEmail } from '../nodemailer/emails.js';
import { hashPassword, comparePassword } from '../utils/authUtility.js';
import { generateTokenAndSetCookie } from '../utils/generateTokenAndSetCookie.js';

const registerUser = async (req, res)=>{
    try{
        const {name, password, email, phone, role} = req.body;
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(405).json({message: "User already exists", data: {...existingUser._doc, password: undefined}, success: false});
        }
        const hashedPassword= await hashPassword(password);
        const verificationToken = Math.floor(100000+Math.random()*900000).toString();
        const newUser = new User({
            username: name, 
            password: hashedPassword, 
            email, 
            phone, 
            role,
            verificationToken,
            verificationTokenExpiresAt: Date.now()+24*60*60*1000
        });
        await newUser.save();
        generateTokenAndSetCookie(res, newUser._id, newUser.role);
        await sendVerificationEmail(newUser.email, verificationToken);
        res.status(201).json({message: "User registered successfully", data: {...newUser._doc, password: undefined}, success: true});
    }catch(error){
        console.log(error);
        res.status(500).json({message: "Cannot register User", success: true});
    }
}

const registerMechanic= async (req, res)=>{
    try{
        const { name, garage_name, password, email, phone, role, coordinates } = req.body;
        const existingMechanic = await Mechanic.findOne({email});
        if(existingMechanic){
            return res.status(200).json({message: "Mechanic already exists", data: {...existingMechanic._doc, password: undefined}, success: false});
        }
        const modifiedCoord = coordinates.split(',');
        const hashedPassword= await hashPassword(password);
        const verificationToken = Math.floor(100000+Math.random()*900000).toString();
        const newMechanic = await Mechanic.create({
            mechanic_name: name,
            garage_name, 
            password: hashedPassword, 
            email, 
            phone, 
            role,
            properties: {
                description: garage_name,
                icon: "https://apis.mapmyindia.com/map_v3/1.png"
            },
            geometry: {
                coordinates: modifiedCoord
            },
            verificationToken,
            verificationTokenExpiresAt: Date.now()+24*60*60*1000
        });
        newMechanic.save();
        generateTokenAndSetCookie(res, newMechanic._id, newMechanic.role);
        await sendVerificationEmail(newMechanic.email, verificationToken);
        res.status(201).json({message: "Mechanic registered successfully", data: {...newMechanic._doc, password: undefined}, success: true});
    }catch(error){
        console.log("Cannot register Mechanic to the Application", error);
        res.status(500).json({message: "Cannot register Mechanic", success: false});
    }
}

// const register = async (req, res) => {
//   const { email } = req.body;

//   const userExists = await User.findOne({ email });
//   if (userExists) {
//     return res.status(400).json({ message: 'User already exists' });
//   }
  
//   const {name, password}=req.body;
//   const hashedPassword = await hashPassword(password);
//   const newUser = new User({name, mobile, email, password: hashedPassword});
//   newUser.save();
// };

// const login = async (req, res) => {
//   const { email } = req.body;

//   const user = await User.findOne({ email });
//   if (!user) {
//     return res.status(400).json({userAuthorized: false, message: "User doesn't exist"});
//   }

//     const {password}=req.body;

//     const result = await comparePassword(password, user.password);

//     if(result){
//         return res.status(200).json({userAuthorized: true});
//     }else{
//         return res.status(401).json({userAuthorized: false, message: "Wrong Password"});
//     }

// };

const login = async (req, res) => {
    try{
        const {password, email, role} = req.body;
        let existingUser = null;
        if(role === 'user'){
            existingUser = await User.findOne({email});
        }else if(role === 'mechanic'){
            existingUser = await Mechanic.findOne({email});
        }else{
            return res.status(401).json({message: "Please select role"});
        }
        if(!existingUser){
                return res.status(404).json({message: "User doesn't exist"});
            }
            const result = await comparePassword(password, existingUser.password);
            if(result){
                generateTokenAndSetCookie(res, existingUser._id, existingUser.role);
                return res.status(200).json({message: "User loggedin successfully", success: true, 
                        data: {
                            ...existingUser._doc,
                            role,
                            password: undefined
                        } 
                    })
            }
            else    
                return res.status(401).json({message: "Wrong Credentials", success: false});

    }catch(e){
        return res.status(500).json({userAuthorized: false, message: "Internal Server Error"});
    }
}

export {registerUser, registerMechanic, login}
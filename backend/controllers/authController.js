import User from '../models/User.js';
import bcrypt from 'bcrypt'

const register = async (req, res) => {
  const { mobile } = req.body;

  const userExists = await User.findOne({ mobile });
  if (userExists) {
    return res.status(400).json({ message: 'User already exists' });
  }
  
  const {name, email, password}=req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({name, mobile, email, password: hashedPassword});
  newUser.save();
};

const login = async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({userAuthorized: false, message: "User doesn't exist"});
  }

  const {password}=req.body;
  bcrypt.compare(password, user.password, (err, result)=>{
    if(result){
      return res.status(200).json({userAuthorized: true});
    }else{
      return res.status(401).json({userAuthorized: false, message: "User unauthorized"});
    }
  });

};

export {register, login}
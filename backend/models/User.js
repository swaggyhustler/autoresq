import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  mobile: { type: String, unique: true },
  password: String,
});

// module.exports = mongoose.model('User', userSchema);
export default mongoose.model('User', userSchema);

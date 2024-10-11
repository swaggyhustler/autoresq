import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true
    },
    phone: {
        type: String,
        required: true
    },
    role: {
        type: String
    },
    isVerified:{
        type: Boolean,
        default: false
    },
    verificationToken: String,
    verificationTokenExpiresAt: Date
}, {timestamps: true});

export default mongoose.model('Users', userSchema);
import mongoose from 'mongoose';

const MechanicSchema=mongoose.Schema({
    mechanic_name: {
        type: String,
        required: true
    },
    garage_name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    type: {
        type: String,
        default: "Feature"
    },
    properties: {
        description: String,
        icon: String
    },
    geometry: {
        type:{
            type: String,
            enum: ['Point'],
            default: 'Point'
        },
        coordinates:{
            type: [Number],
            index: '2dsphere'
        }
    },
    isVerified:{
        type: Boolean,
        default: false
    },
    verificationToken: String,
    verificationTokenExpiresAt: Date
}, {timestamps: true});

export default mongoose.model('Mechanic', MechanicSchema);
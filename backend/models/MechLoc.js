import mongoose from 'mongoose';

const MechLocSchema=mongoose.Schema({
    mechId:{
        type: String,
        required: [true, 'Please add Mechanic ID'],
        unique: true,
        maxlength: [10, 'Mechanic ID must be less than 10 characters']
    },
    address: {
        type: String,
        required: [true, 'Please add an address']
    },
    location: {
        type:{
            type: String,
            enum: ['Point'],
        },
        coordinates:{
            type: [Number],
            index: '2dsphere'
        },
        formattedAddress: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model('MechLoc', MechLocSchema);
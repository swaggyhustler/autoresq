import mongoose, { SchemaType } from 'mongoose';

const BookingSchema = new mongoose.Schema({
    mech_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'MechLoc',
        required: true
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    status:{
        type: String,
        enum: ['Pending', 'Accepted', 'Rejected'],
        default: 'Pending'
    },
    created_at: {
        type: Date,
        default: Date.now()
    }
});

export default mongoose.model('Bookings', BookingSchema);
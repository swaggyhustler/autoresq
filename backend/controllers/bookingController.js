import Bookings from "../models/Bookings.js";
import Mechanic from "../models/Mechanic.js";
import User from "../models/User.js";

const bookMechanic = async (req, res)=>{
    try{
        const {mech_id, user_id} = req.body;
        const newBooking = await Bookings.create({ mech_id, user_id});
        newBooking.save();
        return res.status(200).json({message: "Booking Successfull", success: true});
    }catch(error){
        console.log('Booking Failed!', error);
        res.status(500).json({message: 'Booking Failed'});
    }
}

const getBookings = async (req, res)=>{
    try{
        const {user_id} = req.params;
        const booking = await Bookings.find({user_id});
        const mech_ids = booking.map((item)=>{
            return item.mech_id;
        });
        const result = await Mechanic.find({_id: {$in: mech_ids}}, {garage_name: 1, mechanic_name: 1});;
        let mech_hash = [];
        result.forEach((item, index)=>{
            mech_hash.push({...item._doc, status: booking[index].status});
        });
        return res.status(200).json({message: "Fetched bookings successfully", success: true, data: mech_hash});
    }catch(error){
        console.log("Cannot fetch bookings", error);
        res.status(500).json({message: "Cannot fetch bookings", succes: false});
    }
}

const getRequests = async (req, res) =>{
    try{
        const {mech_id} = req.params;
        const bookings = await Bookings.find({mech_id}).sort({created_at: -1});
        const user_ids = bookings.map((item)=>{
            return item.user_id;
        });
        // let booking_hash = [];
        const result = await User.find({_id: {$in: user_ids}}, {_id: 1, username: 1, email: 1, phone: 1});
        // bookings.forEach((item, index)=>{
        //     const temp = {};
        //     temp[item._id]={
        //         ...item._doc,
        //         ['booking_id']: bookings[index]._id
        //     }
        //     booking_hash.push(temp); 
        // });
        const modified_result = result.map((item, index)=>{
            return {...item._doc, ['booking_id']: bookings[index]._id, ['status']: bookings[index].status};
        });
        return res.status(200).json({message: "Requests fetched successfully", success: true, data: modified_result});
    }catch(error){
        console.log("Cannot fetch users requests for mechanic\n", error);
    }
}

const modifyStatus = async (req, res) => {
    try{
        const {booking_id, status} = req.body;
        await Bookings.findOneAndUpdate({_id: booking_id}, {status}, {new: true, runValidations: true});
        res.status(200).json({message: "Modified status successfully", success: true});
    }catch(error){
        console.log("Cannot modify status\n", error);
        res.status(500).json({message: "Cannot modify status", success: false});
    }
}

const deleteRequest = async (req, res) => {
    try{
        const {booking_id} = req.params;
        await Bookings.deleteOne({_id: booking_id});
        res.status(200).json({message: "Removed request from bookings table", status: true});
    }catch(error){
        console.log("Cannot delete request\n", error);
        res.status(500).json({message: "Cannot delete request", success: false});
    }
}

export {bookMechanic, getBookings, getRequests, modifyStatus, deleteRequest};
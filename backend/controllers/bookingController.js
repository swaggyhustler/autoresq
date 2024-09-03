import Bookings from "../models/Bookings.js";

const bookMechanic=(req, res)=>{
    try{
        const {mech_id, user_id} = req.body;
        const newBooking = Bookings.create({ mech_id, user_id});
        newBooking.save();
    }catch(error){
        console.log('Booking Failed!');
        res.send(500).json({message: 'Booking Failed'});
    }
}
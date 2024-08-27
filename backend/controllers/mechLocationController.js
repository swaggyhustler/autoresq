import MechLoc from "../models/MechLoc.js";

const addMechLoc= async (req, res)=>{
    try{
        console.log(req.body);
        const newMechLoc=await MechLoc.create(req.body);
        res.status(200).json({message: "Location enrolled successfully", data: newMechLoc}); 
    }catch(error){
        res.status(500).json({error: "E: Something went wrong\n error"});
    }
}

const getMechLoc=async(req, res)=>{
    let userLocation=null;
    navigator.geolocation.getCurrentPosition((position)=>{
        userLocation.latitude=position.coords.latitude;
        userLocation.longitude=position.coords.longitude;
    });
    const data=await MechLoc.find({}, {_id: 0, createdAt: 0, mechId: 0});
    res.send(data);
}

export {addMechLoc, getMechLoc};
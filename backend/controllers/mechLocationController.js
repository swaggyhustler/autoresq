import MechLoc from "../models/MechLoc.js";
var currentLoc=null;
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
    const {longitude, latitude}=req.body;
    const data=await MechLoc.find({
        geometry: {
            $near: {
                    $geometry: { type: "Point",  coordinates: [ latitude, longitude ] },
                    $minDistance: 0,
                    $maxDistance: 500
                }
            }
        }, {_id: 0, createdAt: 0, __v: 0});
    res.send(data);
}

export {addMechLoc, getMechLoc};
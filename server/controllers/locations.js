import Location from "../models/Location.js";

export const getAllLocations = async (req, res) => {
    try{
        const locations = await Location.find({ user: req.user._id });
        
        return res.status(200).json({error: false, message: "Locations have been successfully fetched", locations});
    }catch(err){
        return res.status(500).json({ error: true, message: err.message });
    }   
}
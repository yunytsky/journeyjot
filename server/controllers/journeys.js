import Journey from "../models/Journey.js";

const getAllJourneys = async (req, res) => {
    try{
        const journeys = await Journey.find({});
        return res.status(200).json({error: false, message: "Posts have been successfully fetched", journeys});
    }catch(err){
        return res.status(500).json({ error: true, message: err.message });
    }   
}

const addJourney = async (req, res) => {
    try{

    }catch(err){
        return res.status(500).json({ error: true, message: err.message });
    }   
}

const editJourney = async (req, res) => {
    try{

    }catch(err){
        return res.status(500).json({ error: true, message: err.message });
    }   
}

const deleteJourney = async (req, res) => {
    try{
        await Journey.deleteOne({ _id: req.body.postId });
        return res.status(200).json({ error: false, message: "Journey has been removed" });
    }catch(err){
        return res.status(500).json({ error: true, message: err.message });
    }   
}

export {getAllJourneys, addJourney, editJourney, deleteJourney};

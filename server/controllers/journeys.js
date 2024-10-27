import Journey from "../models/Journey.js";

const getAllJourneys = async (req, res) => {
    try{
        const journeys = await Journey.find({ user: req.user._id });
        return res.status(200).json({error: false, message: "Journeys have been successfully fetched", journeys});
    }catch(err){
        return res.status(500).json({ error: true, message: err.message });
    }   
}

const addJourney = async (req, res) => {
    try{        
        const {title, description, date, photoUrl} = req.body;

        const journey = new Journey({
            title,
            description,
            date,
            photoUrl,
            user: req.user._id,
        });

        await journey.save();

        return res.status(201).json({ error: false, message: "Journey added successfully.", journey });

    }catch(err){
        console.log(err)
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

import cloudinary from "../config/cloudinary.js";
import Journey from "../models/Journey.js";

export const getAllJourneys = async (req, res) => {
    try{
        const journeys = await Journey.find({ user: req.user._id });
        
        return res.status(200).json({error: false, message: "Journeys have been successfully fetched", journeys});
    }catch(err){
        return res.status(500).json({ error: true, message: err.message });
    }   
}

export const getSingleJourney = async (req, res) => {
    try {
        const journey = await Journey.findOne({ _id: req.params.journeyId, user: req.user._id });
        if(!journey){
            return res.status(404).json({ error: true, message: "Journey not found" });
        }
        return res.status(200).json({error: false, message: "Journey has been successfully fetched", journey});
    } catch (error) {
        return res.status(500).json({ error: true, message: err.message });
    }
}

export const addJourney = async (req, res) => {
    try{
      const { title, description, startDate, endDate, image } = req.body;

      let uploadResult;
      if(image){
        uploadResult = await cloudinary.uploader
        .upload(
          image, {folder: "journeys"}
        )
        .catch((error) => {
          return res
            .status(500)
            .json({ error: true, message: "Error during photo upload" });
        });   
        
      }

      const journey = new Journey({
        title,
        description,
        startDate,
        endDate,
        user: req.user._id,
        ...(uploadResult ? { image: { url: uploadResult.url, publicId: uploadResult.public_id } } : {}),
      });

      await journey.save();

      return res
        .status(201)
        .json({
          error: false,
          message: "Journey added successfully.",
          journey,
        });
    }catch(err){
        console.log(err)
        return res.status(500).json({ error: true, message: err.message });
    }   
}

export const editJourney = async (req, res) => {
    try{
        const updates = {};

        if (req.body.title) {
            updates.title = req.body.title;
        }
        if (req.body.description  || req.body.description === "") {
            updates.description = req.body.description;
        }
        if (req.body.startDate) {
            updates.startDate = req.body.startDate;
        }
        if (req.body.endDate) {
            updates.endDate = req.body.endDate;
        }

        if (req.body.image) {
            const uploadResult = await cloudinary.uploader
            .upload(
              req.body.image, {folder: "journeys"}
            )
            .catch((error) => {
              return res
                .status(500)
                .json({ error: true, message: "Error during photo upload" });
            });   

            updates.image = {url: uploadResult.url, publicId: uploadResult.public_id};

            //Delete a previous image from cloudinary (if it was not a default image)
            const journey = await Journey.findOne({_id: req.params.journeyId, user: req.user._id});
            if (!journey) {
                return res.status(404).json({ error: true, message: "Journey not found" });
            }
            
            if(journey.image.publicId !== "default"){
                await cloudinary.uploader.destroy(journey.image.publicId);
            }
        }

        const journey = await Journey.findOneAndUpdate(
            { _id: req.params.journeyId, user: req.user._id },
            updates,
            { new: true, runValidators: true }
        );


        if (!journey) {
            return res.status(404).json({ error: true, message: "Journey not found" });
        }



        return res.status(200).json({ error: false, message: "Journey has been successfully updated", journey });
    }catch(err){
        console.log(err)
        return res.status(500).json({ error: true, message: err.message });
    }   
}

export const deleteJourney = async (req, res) => {
    try{
        const journey = await Journey.findOneAndDelete({ _id: req.params.journeyId, user: req.user._id });
        await cloudinary.uploader.destroy(journey.image.publicId);
        return res.status(200).json({ error: false, message: "Journey has been removed" });
    }catch(err){
        return res.status(500).json({ error: true, message: err.message });
    }   
}

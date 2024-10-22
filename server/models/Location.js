import mongoose from "mongoose";

const {Schema} = mongoose;

const locationSchema = new Schema({
    coordinates: {
        lat: { type: Number, required: true },
        lng: { type: Number, required: true },
    },
    journey: { type: mongoose.Schema.Types.ObjectId, ref: 'Journey', required: true },
}, { timestamps: true });

const Location = mongoose.model("Location", locationSchema);

export default Location;
export {locationSchema};
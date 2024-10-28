import mongoose from "mongoose";

const {Schema} = mongoose;

const locationSchema = new Schema({
    name: {type: String, required: true},
    coordinates: {
        lat: { type: Number, required: true },
        lng: { type: Number, required: true },
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

const Location = mongoose.model("Location", locationSchema);

export default Location;
export {locationSchema};
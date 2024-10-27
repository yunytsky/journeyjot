import mongoose from "mongoose";

const {Schema} = mongoose;

const journeySchema = new Schema({
    title: { type: String, required: true },
    description: { type: String },
    startDate: {type: Date, required: true},
    endDate: { 
        type: Date, 
        required: true
    },
    photoUrl: { type: String },
    locations: [{ type: Schema.Types.ObjectId, ref: 'Location' }],
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });


const Journey = mongoose.model("Journey", journeySchema);

export default Journey;
export {journeySchema};
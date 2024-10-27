import mongoose from "mongoose";

const {Schema} = mongoose;

const journeySchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    startDate: { type: Date, required: true },
    endDate: {
      type: Date,
      required: true,
    },
    image: {
      url: {
        type: String,
        required: true,
        default:
          "https://res.cloudinary.com/dlmjkfdpf/image/upload/v1730063876/10009122_qulozs.jpg",
      },
      publicId: { type: String, required: true, default: "default" },
    },
    locations: [{ type: Schema.Types.ObjectId, ref: "Location" }],
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);


const Journey = mongoose.model("Journey", journeySchema);

export default Journey;
export {journeySchema};
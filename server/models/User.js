import mongoose from "mongoose";

const {Schema} = mongoose;

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: {type: String, required: true, min: 6},
  isPremium: { type: Boolean, default: false },
}, { timestamps: true });


const User = mongoose.model("User", userSchema);

export default User;
export {userSchema};
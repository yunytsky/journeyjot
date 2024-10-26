import mongoose from "mongoose";

const {Schema} = mongoose;

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  googleId: {type: String, required: true, unique: true},
  isPremium: { type: Boolean, default: false }
}, { timestamps: true });

const User = mongoose.model("User", userSchema);

export default User;
export {userSchema};
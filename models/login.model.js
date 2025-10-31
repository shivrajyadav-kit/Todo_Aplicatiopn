import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  // role: {
  //   type: String,
  //   enum: ["user", "admin"],
  //   default: "user",
  // },
});


const User = mongoose.model("User", userSchema);
export default User;

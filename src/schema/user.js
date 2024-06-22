import mongoose from "mongoose";
import bcrypt from "bcrypt";
import commonSchema from "./commonSchema.js";

const User = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: false },
  email: { type: String, required: true },
  password: { type: String, required: true },
  isActive: { type: Boolean, default: true },
  points: { type: Number, default: 0 },
  profilePictureUrl: { type: String, required: false, default: "" },
  ...commonSchema.obj,
});

/** extra processing   for userSchema before insertion like
 * hashing the password
 */
User.pre("save", async function (next) {
  // Only hash the password if it's modified or a new user is being created
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }

  next();
});

export default mongoose.model("User", User);

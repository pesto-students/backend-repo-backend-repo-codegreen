import mongoose from "mongoose";
import commonSchema from "./commonSchema.js";

const Milestones = new mongoose.Schema({
  name: { type: String, required: true },
  points: { type: Number, required: true },
  ...commonSchema.obj,
});

export default mongoose.model("Milestones", Milestones);

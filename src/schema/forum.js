import mongoose from "mongoose";
import commonSchema from "./commonSchema.js";

const Forum = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  date: {
    type: Date,
    default: () => new Date(),
  },
  comments: {
    type: [
      {
        _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
        author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        date: { type: Date, default: () => new Date() },
        comment: { type: String, required: true },
      },
    ],
    default: [],
  },
  imageUrls: {
    type: [String],
    default: [],
  },
  ...commonSchema.obj,
});

export default mongoose.model("Forum", Forum);

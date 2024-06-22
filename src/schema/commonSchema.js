import mongoose from "mongoose";

const commonSchema = new mongoose.Schema({
  createdAt: {
    type: Date,
    default: () => new Date(),
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: false,
    default: null,
  },
  updatedAt: {
    type: Date,
    default: () => new Date(),
  },
  updatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    default: null,
  },
});

export default commonSchema;

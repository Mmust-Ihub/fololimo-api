import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    token: {
      type: String,
      trim: true,
      required: true
    },
  },
  { timestamps: true }
);

export const userModel = mongoose.model("User", userSchema);

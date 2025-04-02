import mongoose from "mongoose";

const farmSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  owner: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "User",
  },
  location: {
    type: String,
    required: true,
  },
  size: {
    type: Number,
    required: true,
  },
  geolocation: {
    type: {},
  },
});

export const Farm = mongoose.model("Farm", farmSchema);

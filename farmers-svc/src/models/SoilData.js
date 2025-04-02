import mongoose from "mongoose";

const SoilDataSchema = new mongoose.Schema({
  location: { type: String, required: true },
  nitrogen: {
    type: Number,
    required: true,
  },
  potassium: {
    type: Number,
    required: true,
  },
  phosphorus: {
    type: Number,
    required: true,
  },
  ph: {
    type: Number,
    required: true,
  },
});

export const SoilData = mongoose.model("SoilData", SoilDataSchema);

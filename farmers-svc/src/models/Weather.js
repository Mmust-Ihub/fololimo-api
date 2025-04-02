import { model, Schema } from "mongoose";

const weatherSchema = Schema({
  location: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
  },
  description: {
    type: String,
    required: true,
  },
  temperature: {
    type: Number,
    required: true,
  },
  humidity: {
    type: Number,
    required: true,
  },
});

export const Weather = model("Weather", weatherSchema);

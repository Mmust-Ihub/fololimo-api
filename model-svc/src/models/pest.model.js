import mongoose from "mongoose";
const pestSchema = new mongoose.Schema({
  pest_name: {
    type: String,
    required: true,
    trim: true,
  },
  affected_crops: {
    type: Array,
    required: true,
    trim: true,
  },
  life_cycle: {
    type: Array,
    trim: true,
  },
  treatment: {
    type: Array,
    trim: true,
  },
  preventive_measures: {
    type: Array,
    trim: true,
  },
  environment_conditions: {
    type: Array,
    trim: true,
  },
  companion_planting: {
    type: Array,
    trim: true,
  },
  nutrient_deficiencies: {
    type: Array,
    trim: true
  },
  post_harvest_handling: {
    type: Array,
    trim: true
  },
  image_url: {
    type: String,
    required: true,
    trim: true
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  }
}, {timestamps: true});

export const pestModel = mongoose.model("Pest", pestSchema)
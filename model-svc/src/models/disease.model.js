import mongoose from "mongoose";
const diseaseSchema = new mongoose.Schema({
  crop: {
    type: String,
    required: true,
    trim: true,
  },
  disease: {
    type: String,
    required: true,
    trim: true,
  },
  other_crops_infested: {
    type: Array,
    trim: true,
  },
  cause: {
    type: Array,
    trim: true,
  },
  life_cycle: {
    type: Array,
    trim: true,
  },
  remedy: {
    type: Array,
    trim: true,
  },
  preventive_measures: {
    type: Array,
    trim: true,
  },
  environment_conditions: {
    type: Array,
    trim: true
  },
  nutrient_deficiency: {
    type: Array,
    trim: true
  },
  companion_planting: {
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
  }
});

export const diseaseModel = mongoose.model("Disease", diseaseSchema)
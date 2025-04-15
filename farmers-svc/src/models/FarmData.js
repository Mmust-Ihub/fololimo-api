import { Schema, model } from "mongoose";

const farmSoilDataSchema = new Schema(
  {
    farmId: {
      type: Schema.Types.ObjectId,
      ref: "Farm",
      required: true,
    },
    ph: {
      type: Number,
      required: true,
      min: 0,
      max: 14,
    },
    nitrogen: {
      type: Number,
      required: true,
      min: 0,
    },
    phosphorus: {
      type: Number,
      required: true,
      min: 0,
    },
    potassium: {
      type: Number,
      required: true,
      min: 0,
    },
    moisture: {
      type: Number,
      required: true,
      min: 0,
      max: 100, // assuming this is a percentage
    },
  },
  {
    timestamps: true,
  }
);

export const FarmData = model("FarmData", farmSoilDataSchema);

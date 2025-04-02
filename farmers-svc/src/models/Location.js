import { model, Schema, Types } from "mongoose";

const regionSchema = new Schema({
  region: { type: String, required: true, unique: true },
});

const citySchema = new Schema({
  city: { type: String, required: true },
  region: { type: Types.ObjectId, ref: "Region", required: true },
});

const subCountySchema = new Schema({
  sub_county: { type: String, required: true },
  city: { type: Types.ObjectId, ref: "City", required: true },
});

export const Region = model("Region", regionSchema);
export const City = model("City", citySchema);
export const SubCounty = model("SubCounty", subCountySchema);

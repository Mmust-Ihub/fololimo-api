import { Farm } from "../models/farm.model.js";
import { SoilData } from "../models/SoilData.js";
import { suggestCrop } from "../utils/suggestCrops.js";

export const suggestCrops = async (req, res) => {
  const { purpose, farm } = req.body;
  try {
    const storedFarm = await Farm.findOne({ _id: farm });
    if (!storedFarm) {
      return res
        .status(400)
        .json({ error: "farm with given id does not exist" });
    }
    const soilData = await SoilData.findOne({ location: storedFarm.location });
    if (!soilData) {
      return res
        .status(400)
        .json({ error: "Soil information for  that area was not found" });
    }
    const insight = await suggestCrop(
      storedFarm.location,
      "moderate",
      soilData.nitrogen,
      soilData.phosphorus,
      soilData.potassium,
      soilData.ph,
      purpose
    );
    if (insight.error) {
      throw new Error(insight.error);
    }
    return res.status(200).json(insight);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

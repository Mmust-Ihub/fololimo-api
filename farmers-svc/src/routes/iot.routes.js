import { Router } from "express";
import { Farm } from "../models/farm.model.js";
import { notifyTask } from "../trigger/notify.js";
import { Suggestion } from "../models/Suggestions.js";
import { auth } from "../middleware/auth.js";

export const iotRouter = Router();

iotRouter.post("/data", async (req, res) => {
  const { farmId, ph, nitrogen, moisture, phosphorus, potassium } = req.body;
  if (!farmId) return res.status(400).json({ message: "farmid is required!!" });
  try {
    const farm = await Farm.findOne({ pk: farmId });
    if (!farm) {
      return res.status(404).json({ message: "farm  not found" });
    }
    const handle = await notifyTask.trigger({
      farmId: farm._id,
      userId: farm.owner,
      ph,
      nitrogen,
      moisture,
      phosphorus,
      potassium,
      location: farm.location,
      farmName: farm.name,
    });
    return res.status(202).json({ taskId: handle.id });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

iotRouter.get("/data/:id", auth, async (req, res) => {
  const farmId = req.params.id;
  try {
    const data = await Suggestion.find({ farmId }).sort({ createdAt: -1 });
    return res.status(200).json(data[0]);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

//  ExponentPushToken[w_B4-eIjLE2SROIFBqQckV]

import { Router } from "express";
import { Farm } from "../models/farm.model.js";
import { notifyTask } from "../trigger/notify.js";

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
      farmId:farm._id,
      ph,
      nitrogen,
      moisture,
      phosphorus,
      potassium,
      location: farm.location,
    });
    return res.status(202).json({ taskId: handle.id });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

//  ExponentPushToken[w_B4-eIjLE2SROIFBqQckV]

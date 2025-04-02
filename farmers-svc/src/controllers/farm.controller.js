import { validationResult } from "express-validator";
import { Farm } from "../models/farm.model.js";
import { farmResponse } from "../utils/responses.js";

export const createFarm = async (req, res) => {
  const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array()[0] });
      return;
    }
  try {
    const newFarm = { ...req.body, owner: req.user.id };
    const farm = new Farm(newFarm);
    await farm.save();
    res.status(201).json({
      message: "farm created",
      farm: farmResponse(farm._doc),
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getFarm = async (req, res) => {
  const farmId = req.params.id;
  try {
    const farm = await Farm.findOne({ _id: farmId, owner: req.user.id });
    if (!farm) return res.status(404).json({ message: "farm not found" });
    res.status(200).json(farmResponse(farm._doc));
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const getFarms = async (req, res) => {
  try {
    const farms = await Farm.find({ owner: req.user.id });
    res.status(200).json(farms.map((farm) => farmResponse(farm)));
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const updateFarm = async (req, res) => {
  res.status(501).json({
    message: "coming soon",
  });
};

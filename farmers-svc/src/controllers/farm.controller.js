import { Farm } from "../models/farm.model.js";

const farmResponse = (farm) => {
  return {
    id: farm._id,
    name: farm.name,
    owner: farm.owner,
    location: farm.location,
    size: farm.size,
    geolocation: farm.geolocation,
  };
};

export const createFarm = async (req, res) => {
  try {
    const newFarm = { ...req.body, owner: req.userId };
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
    const farm = await Farm.findOne({ _id: farmId });
    res.status(200).json(farmResponse(farm._doc));
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const getFarms = async (req, res) => {
  try {
    const farms = await Farm.find({ owner: req.userId });
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

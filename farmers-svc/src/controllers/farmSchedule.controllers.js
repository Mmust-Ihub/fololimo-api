import { Farm } from "../models/farm.model.js";
import { FarmingActivity } from "../models/FarmSchedule.js";
import { generateSchedule } from "../utils/geminiSchedule.js";

export const createSchedule = async (req, res) => {
  try {
    const { farmId, crops } = req.body;
    const farm = await Farm.findOne({ _id: farmId });
    if (!farm) {
      return res.status(400).json({ message: "Farm does not  exist." });
    }
    const schedules = await generateSchedule(farm.location, farm.size, crops);
    if (schedules.error) {
      throw new Error(schedules.error);
    }
    schedules.forEach(async (schedule) => {
      const newSchedule = new FarmingActivity({ ...schedule, farmId });
      await newSchedule.save();
    });
    return res.status(201).json({ message: "schedule created successfully." });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
export const getFarmSchedule = async (req, res) => {
  try {
    const { farmId } = req.body;
    if (!farmId) {
      const schedules = await FarmingActivity.getActivitiesByUserId(
        req.user.id
      );
      return res.status(200).json(schedules);
    }

    const schedules = await FarmingActivity.find({ farmId: farmId });
    return res.status(200).json(schedules);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const getSchedule = async (req, res) => {
  const { id } = req.params;
  try {
    const schedule = await FarmingActivity.findOne({ _id: id });
    if (!schedule)
      return res
        .status(400)
        .json({ error: `Farmschedule ${id} does not exist` });
    return res.status(200).json(schedule);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

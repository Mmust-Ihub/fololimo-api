import { validationResult } from "express-validator";
import { Activity } from "../models/Activity.js";
import mongoose from "mongoose";
import { activityResponse } from "../utils/responses.js";

export const createActivity = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array()[0] });
    return;
  }
  try {
    const activity = new Activity(req.body);
    await activity.save();
    res.status(201).json({ message: "Activity created successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

async function getFarmIdsByUserId(userId) {
  const farms = await mongoose
    .model("Farm")
    .find({ owner: userId })
    .select("_id");
  return farms.map((farm) => farm._id);
}

export const getActivities = async (req, res) => {
  const { page, limit, skip } = req.pagination;
  const { type } = req.query;

  try {
    if (!type) {
      const activityModels = await Activity.getActivitiesByUserId(
        req.user.id,
        page,
        limit
      );
      const activities = activityModels.map((activity) =>
        activityResponse(activity)
      );
      const total = await Activity.getUserActivityCount(req.user.id);
      const pages = Math.ceil(total / limit);
      res.status(200).json({
        pages,
        total,
        limit,
        page,
        activities,
      });
    } else if (type === "past") {
      const activityModels = await Activity.getPastActivitiesByUser(
        req.user.id,
        page,
        limit
      );
      const activities = activityModels.map((activity) =>
        activityResponse(activity)
      );

      const total = await Activity.countDocuments({
        farmId: { $in: await getFarmIdsByUserId(req.user.id) },
        endDate: { $lt: new Date() },
      });
      const pages = Math.ceil(total / limit);

      res.status(200).json({
        type: "past activities",
        pages,
        total,
        limit,
        page,
        activities,
      });
    } else if (type === "upcoming") {
      const activityModels = await Activity.getUpcomingActivitiesByUser(
        req.user.id,
        page,
        limit
      );
      const activities = activityModels.map((activity) =>
        activityResponse(activity)
      );
      const total = await Activity.countDocuments({
        farmId: { $in: await getFarmIdsByUserId(req.user.id) },
        endDate: { $gt: new Date() },
      });
      const pages = Math.ceil(total / limit);
      res.status(200).json({
        type: "upcoming activities",
        pages,
        total,
        limit,
        page,
        activities,
      });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getActivity = async (req, res) => {
  const { id } = req.params;
  console.log("id:  ", req.user.id);
  try {
    const activity = await Activity.getActivityByIdAndUser(req.user.id, id);
    if (!activity) {
      res.status(404).json({ message: `activity with ${id} does not exist` });
      return;
    }
    res.status(200).json(activityResponse(activity));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateActivity = async (req, res) => {
  res.status(200).json([]);
};

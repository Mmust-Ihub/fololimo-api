import express from "express";
import {
  createActivity,
  getActivities,
  updateActivity,
} from "../controllers/activity.controllers.js";

export const activityRouter = express.Router();
activityRouter.post("", createActivity);
activityRouter.get("", getActivities);
activityRouter.get("/:id", getActivities);
activityRouter.patch("/:id", updateActivity);

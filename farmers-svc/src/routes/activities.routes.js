import express from "express";
import {
  createActivity,
  getActivities,
  getActivity,
  updateActivity,
} from "../controllers/activity.controllers.js";
import { validateActivity } from "../validators/activity.js";
import { paginate } from "../middleware/paginate.js";

export const activityRouter = express.Router();
activityRouter.post("", validateActivity, createActivity);
activityRouter.get("",paginate, getActivities);
activityRouter.get("/:id", getActivity);
activityRouter.patch("/:id", updateActivity);

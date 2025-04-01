import express from "express";
import {
  createSchedule,
  getFarmSchedule,
  getSchedule,
} from "../controllers/farmSchedule.controllers.js";
import { paginate } from "../middleware/paginate.js";

export const farmScheduleRouter = express.Router();

farmScheduleRouter.post("", createSchedule);
farmScheduleRouter.get("",paginate, getFarmSchedule);
farmScheduleRouter.get("/:id", getSchedule);

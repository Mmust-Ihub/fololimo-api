import express from "express";
import {
  createSchedule,
  getFarmSchedule,
  getSchedule,
} from "../controllers/farmSchedule.controllers.js";

export const farmScheduleRouter = express.Router();

farmScheduleRouter.post("", createSchedule);
farmScheduleRouter.get("", getFarmSchedule);
farmScheduleRouter.get("/:id", getSchedule);

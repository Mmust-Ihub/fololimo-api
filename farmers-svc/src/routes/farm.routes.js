import express from "express";
import {
  createFarm,
  getFarm,
  getFarms,
  updateFarm,
} from "../controllers/farm.controller.js";

export const farmRouter = express.Router();
farmRouter.post("", createFarm);
farmRouter.get("", getFarms);
farmRouter.get("/:id", getFarm);
farmRouter.patch("/:id", updateFarm);

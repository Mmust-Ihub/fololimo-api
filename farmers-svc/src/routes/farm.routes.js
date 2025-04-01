import express from "express";
import {
  createFarm,
  getFarm,
  getFarms,
  updateFarm,
} from "../controllers/farm.controller.js";
import { paginate } from "../middleware/paginate.js";

export const farmRouter = express.Router();
farmRouter.post("",createFarm);
farmRouter.get("", paginate,getFarms);
farmRouter.get("/:id", getFarm);
farmRouter.patch("/:id", updateFarm);

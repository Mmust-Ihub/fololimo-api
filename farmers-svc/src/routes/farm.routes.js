import express from "express";
import {
  createFarm,
  getFarm,
  getFarmByPk,
  getFarms,
  updateFarm,
} from "../controllers/farm.controller.js";
import { paginate } from "../middleware/paginate.js";
import { validateFarm } from "../validators/farm.js";

export const farmRouter = express.Router();
farmRouter.post("",validateFarm,createFarm);
farmRouter.get("", paginate,getFarms);
farmRouter.get("/:id", getFarm);
farmRouter.get("/pk/:pk", getFarmByPk);
farmRouter.patch("/:id", updateFarm);

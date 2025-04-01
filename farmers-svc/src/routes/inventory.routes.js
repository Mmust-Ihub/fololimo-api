import express from "express";
import {
  createInventory,
  getFarmInventories,
  getInventoryById,
  getMyInventories,
} from "../controllers/inventory.controllers.js";
import { paginate } from "../middleware/paginate.js";

export const inventoryRouter = express.Router();

inventoryRouter.post("", createInventory);
inventoryRouter.get("/my", paginate,getMyInventories);
inventoryRouter.get("/my/:farmId", paginate,getFarmInventories);
inventoryRouter.get(":id", getInventoryById);

import express from "express";
import {
  createInventory,
  getFarmInventories,
  getInventoryById,
  getMyInventories,
} from "../controllers/inventory.controllers.js";

export const inventoryRouter = express.Router();

inventoryRouter.post("", createInventory);
inventoryRouter.get("/my", getMyInventories);
inventoryRouter.get("/my/:farmId", getFarmInventories);
inventoryRouter.get(":id", getInventoryById);

import express from "express";
import { createInventory, getInventories } from "../controllers/inventory.controllers.js";

export const inventoryRouter = express.Router();

inventoryRouter.post("", createInventory);
inventoryRouter.get("", getInventories);

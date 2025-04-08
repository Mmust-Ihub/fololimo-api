import { validationResult } from "express-validator";
import { Inventory } from "../models/Inventory.js";

export const createInventory = async (req, res) => {
  const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array()[0] });
      return;
    }
  try {
    const newInventory = new Inventory(req.body);
    newInventory.save();
    return res.status(201).json(newInventory);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const getMyInventories = async (req, res) => {
  try {
    const inventories = await Inventory.getInventoryByUserId(req.user.id);
    return res.status(200).json(inventories);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
export const getFarmInventories = async (req, res) => {
  const farmId = req.params.farmId;
  try {
    const inventories = await Inventory.find({ farmId: farmId });
    return res.status(200).json(inventories);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const getInventoryById = async (req, res) => {
  const id = req.params.id;
  try {
    const inventory = await Inventory.find({ id: id });
    if (!inventory)
      return res.status(404).json({ error: `inventory ${id} not found` });
    return res.status(200).json(inventory);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

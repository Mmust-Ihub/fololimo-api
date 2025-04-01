import express from "express";
import {
  getAgrovets,
  notifyAgrovet,
} from "../controllers/agrovet.controller.js";
export const agrovetRouter = express.Router();

agrovetRouter.get("", getAgrovets);
agrovetRouter.post("/notify", notifyAgrovet);

import express from "express";
import { suggestCrops } from "../controllers/suggest.controller.js";

export const aiRouter = express.Router();
aiRouter.post("/suggest-crop", suggestCrops);

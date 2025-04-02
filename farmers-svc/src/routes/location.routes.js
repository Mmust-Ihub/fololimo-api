import express from "express";
import {
  getCitiesByRegion,
  getRegions,
  getSubCountiesByCity,
} from "../controllers/location.controller.js";

export const locatioRrouter = express.Router();
locatioRrouter.get("/regions", getRegions);
locatioRrouter.get("/cities/:region", getCitiesByRegion);
locatioRrouter.get("/sub-counties/:city", getSubCountiesByCity);

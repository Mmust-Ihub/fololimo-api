import express from "express";
import {
  createWeather,
  getWeather,
} from "../controllers/weather.controller.js";
import { auth } from "../middleware/auth.js";

export const weatherRouter = express.Router();
weatherRouter.get("", auth, getWeather);
weatherRouter.get("/update", createWeather);

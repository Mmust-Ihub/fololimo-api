import express from "express";
import { getWeather } from "../controllers/weather.controller.js";

export const weatherRouter = express.Router();
weatherRouter.get("", getWeather);

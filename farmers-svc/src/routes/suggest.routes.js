import express from "express";
import { suggest } from "../controllers/suggest.controller.js";

export const aiRouter = express.Router();
aiRouter.get("/suggest", suggest);

import express from "express";
import {
  drShambaChat,
  getChats,
  getMessages,
  suggestCrops,
} from "../controllers/suggest.controller.js";

export const aiRouter = express.Router();
aiRouter.post("/suggest-crop", suggestCrops);
aiRouter.post("/chat", drShambaChat);
aiRouter.get("/chat", getChats);
aiRouter.get("/chat/:id", getMessages);

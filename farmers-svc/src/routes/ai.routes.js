import express from "express";
import {
  analysis,
  drShambaChat,
  getChats,
  getMessages,
  suggestCrops,
} from "../controllers/ai.controller.js";

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

import multer from "multer";

export const aiRouter = express.Router();
aiRouter.post("/suggest-crop", suggestCrops);
aiRouter.post("/chat", drShambaChat);
aiRouter.get("/chat", getChats);
aiRouter.get("/chat/:id", getMessages);
aiRouter.post("/analyse", upload.single("file"), analysis);

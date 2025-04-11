import { json } from "express";
import { Chat } from "../models/Chat.js";
import { Farm } from "../models/farm.model.js";
import { SoilData } from "../models/SoilData.js";
import { drShamba } from "../utils/drshamba.js";
import { suggestCrop } from "../utils/suggestCrops.js";
import { analyseImage } from "../utils/imageProcess.js";

export const suggestCrops = async (req, res) => {
  const { purpose, farm } = req.body;
  try {
    const storedFarm = await Farm.findOne({ _id: farm });
    if (!storedFarm) {
      return res
        .status(400)
        .json({ error: "farm with given id does not exist" });
    }
    const soilData = await SoilData.findOne({ location: storedFarm.location });
    if (!soilData) {
      return res
        .status(400)
        .json({ error: "Soil information for  that area was not found" });
    }
    const insight = await suggestCrop(
      storedFarm.location,
      "moderate",
      soilData.nitrogen,
      soilData.phosphorus,
      soilData.potassium,
      soilData.ph,
      purpose
    );
    if (insight.error) {
      throw new Error(insight.error);
    }
    return res.status(200).json(insight);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const drShambaChat = async (req, res) => {
  const { chatId, message } = req.body;
  if (!message) {
    return res.status(400).json({ errror: "message is required" });
  }
  try {
    if (!chatId) {
      const newChat = await Chat.create({
        user: req.user.id,
        history: [
          {
            role: "user",
            parts: [
              {
                text: message,
              },
            ],
          },
        ],
      });
      const msg = await drShamba(message);
      const modelMessage = {
        role: "model",
        parts: [
          {
            text: msg,
          },
        ],
      };
      newChat.history.push(modelMessage);

      await newChat.save();
      return res.status(201).json({ chatId: newChat._id, modelMessage: msg });
    } else {
      const chat = await Chat.findOne({ _id: chatId });
      if (!chat)
        return res.status(404).json({ error: "Chat with ${chatId} not found" });
      const hist = chat.history.map((msg) => ({
        role: msg.role,
        parts: [
          {
            text: msg.parts[0].text,
          },
        ],
      }));
      const modelRes = await drShamba(message, hist);
      const userMsg = {
        role: "user",
        parts: [
          {
            text: message,
          },
        ],
      };
      const modelMsg = {
        role: "model",
        parts: [
          {
            text: modelRes,
          },
        ],
      };
      chat.history.push(userMsg, modelMsg);
      await chat.save();
      return res.status(200).json({ chatId: chat._id, modelMessage: modelRes });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const getMessages = async (req, res) => {
  const { id: chatId } = req.params;
  try {
    const chat = await Chat.findOne({ _id: chatId });
    if (!chat)
      return res
        .status(404)
        .json({ error: "chat with the given id not found" });
    const messages = chat.history;
    return res.status(200).json(chat);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const getChats = async (req, res) => {
  try {
    const myChats = await Chat.find({ user: req.user.id });
    const chats = myChats.map((chat) => ({
      chatId: chat._id,
      createdAt: chat.createdAt,
      lastMsg: chat.history[chat.history.length - 1].parts[0].text,
    }));
    return res.status(200).json(chats);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const analysis = async (req, res) => {
  if (!req.file) return res.status(400).json({ message: "Image is required" });
  const file = req.file;

  try {
    const blob = new Blob([file.buffer], { type: file.mimetype });
    const resp = await analyseImage(blob, file.mimetype);
    return res.status(200).json(JSON.parse(resp));
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

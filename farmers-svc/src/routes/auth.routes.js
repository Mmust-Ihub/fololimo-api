import express from "express";
import {
  getUser,
  login,
  refreshToken,
  register,
} from "../controllers/auth.controllers.js";
import { auth } from "../middleware/auth.js";
import { validateUser } from "../validators/user.js";
import { Notification } from "../models/Notification.js";

export const userRouter = express.Router();
userRouter.post("/login", login);
userRouter.post("/register", validateUser, register);
userRouter.post("/refresh-token", refreshToken);
userRouter.post("/expo-token", auth, async (req, res) => {
  const { token } = req.body;
  const userId = req.user.id;
  try {
    if (userId) {
      return res.status(401);
    }
    const notification = new Notification({ user: userId, token: token });
    await notification.save();
    return res.status(201).json({ message: "token added successfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});
userRouter.get("/user", auth, getUser);

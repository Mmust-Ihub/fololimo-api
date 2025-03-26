import express from "express";
import {
  login,
  refreshToken,
  register,
} from "../controllers/users.controllers.js";

export const userRouter = express.Router();
userRouter.post("/login", login);
userRouter.post("/register", register);
userRouter.post("/refresh-token", refreshToken);

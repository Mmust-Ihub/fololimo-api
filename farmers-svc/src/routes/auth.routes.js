import express from "express";
import {
  getUser,
  login,
  refreshToken,
  register,
} from "../controllers/auth.controllers.js";
import { auth } from "../middleware/auth.js";
import { validateUser } from "../validators/user.js";


export const userRouter = express.Router();
userRouter.post("/login", login);
userRouter.post("/register",validateUser, register);
userRouter.post("/refresh-token", refreshToken);
userRouter.get("/user",auth,getUser)

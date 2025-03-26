import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";

export const login = async (req, res) => {
  const { username, email, password } = req.body;
  let user;
  try {
    if (username) {
      user = await User.findOne({ username });
    }
    if (email) {
      user = await User.findOne({ email });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
    res.json({ token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
export const register = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = new User(req.body);
    await user.save();

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
    res.status(201).json({ token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
export const refreshToken = async (req, res) => {
  res.status(200).json({ message: "refresh route" });
};

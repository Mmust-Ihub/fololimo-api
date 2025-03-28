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
    if (user) {
      if (await user.comparePassword(password)) {
        const expiresAt = Date.now() + 3600 * 24 * 1000;
        const accessToken = jwt.sign(
          { userId: user._id, role: user.role, expiresAt },
          process.env.JWT_SECRET
        );
        const expiresOn = Date.now() + 3600 * 24 * 30 * 1000;
        const refreshToken = jwt.sign(
          { userId: user._id, role: user.role, expiresOn },
          process.env.JWT_SECRET
        );
        res.json({ accessToken, refreshToken });
      }
    } else {
      res.status(400).json({
        message: "username or password is wrong",
      });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
export const register = async (req, res) => {
  try {
    // const { email, password } = req.body;
    const user = new User(req.body);
    await user.save();

    res.status(201).json({ message: "user registered successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
export const refreshToken = async (req, res) => {
  const { refreshToken: token } = req.body;
  let user;
  try {
    if (!token) {
      throw new Error("authentication credentials missing");
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (Date.now() > decoded.expiresOn) {
      throw new Error("the token provided has expired");
    }
    user = await User.find({ _id: decoded.userId });
    if (!user) {
      throw new Error("Invalid refresh token");
    }
    const expiresAt = Date.now() + 3600 * 24;
    const accessToken = jwt.sign(
      { userId: user._id, role: user.role, expiresAt },
      process.env.JWT_SECRET
    );
    const expiresOn = Date.now() + 3600 * 24 * 30;
    const refreshToken = jwt.sign(
      { userId: user._id, role: user.role, expiresOn },
      process.env.JWT_SECRET
    );
    res.status(200).json({ accessToken, refreshToken });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

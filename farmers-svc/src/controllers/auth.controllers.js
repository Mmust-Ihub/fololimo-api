import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";

const generateAccessToken = (user) => {
  return jwt.sign({ id: user._id }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: process.env.JWT_ACCESS_EXPIRY,
  });
};

const generateRefreshToken = (user) => {
  return jwt.sign({ id: user._id }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: process.env.JWT_REFRESH_EXPIRY,
  });
};

export const register = async (req, res) => {
  try {
    const { username, email } = req.body;

    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "Email already taken" });

    user = await User.findOne({ username });
    if (user)
      return res.status(400).json({ message: "Username already taken" });

    user = new User(req.body);
    await user.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const login = async (req, res) => {
  let user;
  try {
    const { email, username, password } = req.body;
    if (username) {
      user = await User.findOne({ username });
    }
    if (email) {
      user = await User.findOne({ email });
    }
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    if (!(await user.comparePassword(password)))
      return res.status(400).json({ message: "Invalid credentials" });

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    user.refreshToken = refreshToken;
    await user.save();

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
    });

    res.json({ accessToken, refreshToken });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const refreshToken = async (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken)
    return res.status(403).json({ message: "Refresh token required" });

  try {
    const user = await User.findOne({ refreshToken });
    if (!user)
      return res.status(403).json({ message: "Invalid refresh token" });

    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      (err, decoded) => {
        if (err)
          return res.status(403).json({ message: "Invalid refresh token" });

        const newAccessToken = generateAccessToken(user);
        res.json({ accessToken: newAccessToken });
      }
    );
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getUser = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user.id });
    if (!user) {
      return res.status(400).json({ error: "invalid user id" });
    }
    res
      .status(200)
      .json({
        ...user._doc,
        refreshToken: undefined,
        __v: undefined,
        _id: undefined,
      });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

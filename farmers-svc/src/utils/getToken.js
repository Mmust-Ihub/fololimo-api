import mongoose from "mongoose";
import { Suggestion } from "../models/Suggestions.js";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB Connected");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    process.exit(1);
  }
};

export const getToken = async (userId) => {
  try {
    await connectDB(farmId, geminiRes);
    const token = await Notification.findOne({ user: userId });
    if (!token) throw new Error("token not found");
    return { status: true, token };
  } catch (error) {
    console.log(error.message);
    return { status: false, message: error.message };
  }
};

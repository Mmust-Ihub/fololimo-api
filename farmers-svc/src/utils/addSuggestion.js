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

export const createSuggestion = async (farmId, geminiRes) => {
  try {
    await connectDB();
    const suggestion = new Suggestion({
      farmId: farmId,
      suggestion: geminiRes,
    });
    await suggestion.save();
    return { status: true };
  } catch (error) {
    console.log(error.message);
    return { status: false, message: error.message };
  }
};

import { Router } from "express";
import { Farm } from "../models/farm.model.js";
import { Activity } from "../models/Activity.js";
import { SubCounty } from "../models/Location.js";
import { Weather } from "../models/Weather.js";
import { Inventory } from "../models/Inventory.js";

export const summaryRouter = Router();

summaryRouter.get("/summary", async (req, res) => {
  const userId = req.user.id;
  try {
    const farms = await Farm.find({ owner: userId });
    if (!farms || farms.length === 0) {
      console.log("No farms found for this user.");
      return res
        .status(200)
        .json({
          activities: [],
          weather: [],
          transactions: { totalIncome: 0, totalExpenses: 0, netProfit: 0 },
        });
    }
    const farmIds = farms.map((farm) => farm._id);
    const activities = await Activity.find({ farmId: { $in: farmIds } });
    console.log("activities: ", activities);
    const transactions = await Inventory.getFinancialSummary(userId);
    const weatherPromises = farms.map(async (farm) => {
      const location = await SubCounty.findOne({
        sub_county: farm.location,
      }).populate("city", "city");
      if (location && location.city) {
        console.log("location:  ", location.city.city);
        const weather = await Weather.findOne({ location: location.city.city });
        console.log("weather: ", weather);
        if (weather) {
          return {
            ...weather._doc,
            _id: undefined,
            __v: undefined,
            farm: farm.name,
            farmId: farm._id,
          };
        }
      }
      return null; // Handle cases where location or weather is not found
    });

    const weatherD = (await Promise.all(weatherPromises)).filter(Boolean); // filter out null values.
    console.log("data: ", weatherD);

    return res
      .status(200)
      .json({ activities, weather: weatherD, transactions: transactions });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

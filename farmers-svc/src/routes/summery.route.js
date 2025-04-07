import { Router } from "express";
import { Farm } from "../models/farm.model.js";
import { Activity } from "../models/Activity.js";
import { SubCounty } from "../models/Location.js";
import { Weather } from "../models/Weather.js";

export const summaryRouter = Router();

summaryRouter.get("/summary", async (req, res) => {
  const userId = req.user.id;
  try {
    const farms = await Farm.find({ owner: userId });
    const activities = await Activity.getActivitiesByUserId(userId);
    const weatherPromises = farms.map(async (farm) => {
      const location = await SubCounty.findOne({
        sub_county: farm.location,
      }).populate("city", "city");
      if (location) {
        console.log("location:  ", location.city.city);
        const weather = await Weather.findOne({ location: location.city.city });
        console.log("weather: ", weather);
        return {
          ...weather._doc,
          _id: undefined,
          __v: undefined,
          farm: farm.name,
        };
      }
      return null; // Handle cases where location is not found
    });

    const weatherD = (await Promise.all(weatherPromises)).filter(Boolean); // filter out null values.
    console.log("data: ", weatherD);

    return res.status(200).json({ activities, weather: weatherD });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

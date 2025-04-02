import { Weather } from "../models/Weather.js";
import { updateAllCountiesWeather } from "../utils/createWeather.js";

export const getWeather = async (req, res) => {
  const { location } = req.query;
  if (!location) {
    return res.status(400).json({ error: "location must be provided" });
  }

  try {
    const weather = await Weather.findOne({ location });
    if (!weather) {
      return res
        .status(404)
        .json({ error: "weather for the provided location not found" });
    }
    res.status(200).json({ ...weather._doc, _id: undefined, __v: undefined });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const createWeather = async (req, res) => {
  try {
    const mess = await updateAllCountiesWeather();
    return res.status(200).json({ message: mess });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

import { Region, City, SubCounty } from "../models/Location.js";

export const getRegions = async (req, res) => {
  try {
    const regions = await Region.find();
    res.json(
      regions.map((region) => ({
        id: region._id,
        region: region.region,
      }))
    );
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

export const getCitiesByRegion = async (req, res) => {
  try {
    const { region } = req.params;
    if (!region) {
      return res.status(400).json({ error: "Region ID is required" });
    }

    const cities = await City.find({ region });

    res.json(
      cities.map((city) => ({
        id: city._id,
        city: city.city,
      }))
    );
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

export const getSubCountiesByCity = async (req, res) => {
  try {
    const { city } = req.params;
    if (!city) {
      return res.status(400).json({ error: "City ID is required" });
    }

    const subCounties = await SubCounty.find({ city });
    res.json(
      subCounties.map((subCounty) => ({
        id: subCounty._id,
        subCounty: subCounty.sub_county,
      }))
    );
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

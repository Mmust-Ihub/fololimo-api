import mongoose from "mongoose";
import { SoilData } from "../models/SoilData.js";

import { config, geocoding } from "@maptiler/client";

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/fololimo", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      connectTimeoutMS: 30000, // Prevent timeout errors
    });
    console.log("✅ MongoDB Connected");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    process.exit(1);
  }
};
await connectDB();

function extractSoilData(data) {
  console.log("data: ", data);
  const nitrogenData = data.property.nitrogen_total;
  const potassiumData = data.property.potassium_extractable;
  const phosphorusData = data.property.phosphorous_extractable;
  const phData = data.property.ph;
  function calculateAverage(propertyData) {
    if (!propertyData || propertyData.length === 0) {
      return null;
    }

    let sum = 0;
    let count = 0;

    propertyData.forEach((item) => {
      if (item.value && typeof item.value.value === "number") {
        sum += item.value.value;
        count++;
      }
    });

    if (count === 0) {
      return null;
    }

    return sum / count;
  }

  const nitrogen = calculateAverage(nitrogenData);
  const potassium = calculateAverage(potassiumData);
  const phosphorus = calculateAverage(phosphorusData);
  const ph = calculateAverage(phData);

  return {
    nitrogen,
    potassium,
    phosphorus,
    ph,
  };
}

const apiKey = "AIzaSyCruMPt43aekqITCooCNWGombhbcor3cf4";

const getSoilData = async (lat, lon) => {
  console.log("lon: ", lon, "lat: ", lat);
  try {
    const res = await fetch(
      `https://api.isda-africa.com/v1/soilproperty?key=${apiKey}&lat=${lat}&lon=${lon}`
    );
    console.log(res.status);
    if (!res.ok) {
      const data = await res.json();
      console.log(data);
      return;
    }
  } catch (error) {}
};

const getGeo = async (county) => {
  config.apiKey = "ZaSbVlnEgmO275Ft2qwm";
  try {
    const data = await geocoding.forward(county);
    const result = data.features[1].geometry.coordinates;
    // console.log("result: ", result);
    return result;
  } catch (error) {
    console.log(error);
    return;
  }
};

const counties = [
  "Kiambu",
  "Murang'a",
  "Nyeri",
  "Kirinyaga",
  "Nyandarua",
  "Nakuru",
  "Uasin Gishu",
  "Kericho",
  "Baringo",
  "Narok",
  "Bomet",
  "Elgeyo-Marakwet",
  "Kajiado",
  "Laikipia",
  "Nandi",
  "Samburu",
  "Trans Nzoia",
  "Turkana",
  "West Pokot",
  "Embu",
  "Kitui",
  "Machakos",
  "Makueni",
  "Marsabit",
  "Meru",
  "Tharaka-Nithi",
  "Isiolo",
  "Homa Bay",
  "Kisii",
  "Kisumu",
  "Migori",
  "Nyamira",
  "Siaya",
  "Bungoma",
  "Busia",
  "Kakamega",
  "Vihiga",
  "Kilifi",
  "Kwale",
  "Lamu",
  "Mombasa",
  "Taita-Taveta",
  "Tana River",
  "Garissa",
  "Mandera",
  "Wajir",
  "Nairobi",
];

const createSoilData = async () => {
  try {
    counties.forEach(async (county) => {
      const geo = await getGeo(county);
      const data = await getSoilData(geo[1], geo[0]);
      const soilData = extractSoilData(data);
      const newData = SoilData({ ...soilData, location: county });
      newData.save();
    });
  } catch (error) {
    console.log("Error: ", error.message);
  }
};

await createSoilData();
mongoose.disconnect();

import mongoose from "mongoose";
import { SoilData } from "../models/SoilData.js";

const counties = [
  { county: "Mombasa", latitude: -4.05, longitude: 39.6667 },
  { county: "Kwale", latitude: -4.1744, longitude: 39.4603 },
  { county: "Kilifi", latitude: -3.6333, longitude: 39.85 },
  { county: "Tana River", latitude: -1.5, longitude: 40.0333 },
  { county: "Lamu", latitude: -2.2694, longitude: 40.9022 },
  { county: "Taita-Taveta", latitude: -3.3983, longitude: 38.3603 },
  { county: "Garissa", latitude: -0.4569, longitude: 39.6583 },
  { county: "Wajir", latitude: 1.75, longitude: 40.05 },
  { county: "Mandera", latitude: 3.9167, longitude: 41.8333 },
  { county: "Marsabit", latitude: 2.3333, longitude: 37.9833 },
  { county: "Isiolo", latitude: 0.35, longitude: 37.5833 },
  { county: "Meru", latitude: 0.05, longitude: 37.65 },
  { county: "Tharaka-Nithi", latitude: -0.3833, longitude: 37.5667 }, //Approximate Kathwana location
  { county: "Embu", latitude: -0.5389, longitude: 37.4583 },
  { county: "Kitui", latitude: -1.3667, longitude: 38.0167 },
  { county: "Machakos", latitude: -1.5167, longitude: 37.2667 },
  { county: "Makueni", latitude: -1.7833, longitude: 37.6333 },
  { county: "Nyandarua", latitude: -0.05, longitude: 36.65 }, //Approximate Ol Kalou location
  { county: "Nyeri", latitude: -0.4167, longitude: 36.95 },
  { county: "Kirinyaga", latitude: -0.5, longitude: 37.2833 },
  { county: "Murang'a", latitude: -0.7167, longitude: 37.15 }, //approximate central point
  { county: "Kiambu", latitude: -1.1667, longitude: 36.8167 },
  { county: "Turkana", latitude: 3.1167, longitude: 35.6 },
  { county: "West Pokot", latitude: 1.45, longitude: 35.62 }, //Approximate Kapenguria location
  { county: "Samburu", latitude: 1.1, longitude: 36.7 },
  { county: "Trans-Nzoia", latitude: 1.0167, longitude: 35.0 },
  { county: "Uasin Gishu", latitude: 0.5167, longitude: 35.2833 },
  { county: "Elgeyo-Marakwet", latitude: 0.6731, longitude: 35.5083 },
  { county: "Nandi", latitude: 0.3333, longitude: 35.1667 },
  { county: "Baringo", latitude: 0.5, longitude: 35.75 }, //Approximate Kabarnet location
  { county: "Laikipia", latitude: 0.26, longitude: 36.5363 },
  { county: "Nakuru", latitude: -0.3, longitude: 36.0667 },
  { county: "Narok", latitude: -1.0833, longitude: 35.8667 },
  { county: "Kajiado", latitude: -1.85, longitude: 36.7833 },
  { county: "Kericho", latitude: -0.3692, longitude: 35.2839 },
  { county: "Bomet", latitude: -0.7833, longitude: 35.3333 }, // Approximate central point
  { county: "Kakamega", latitude: 0.2822, longitude: 34.754 },
  { county: "Vihiga", latitude: 0.05, longitude: 34.725 },
  { county: "Bungoma", latitude: 0.5667, longitude: 34.5667 },
  { county: "Busia", latitude: 0.4633, longitude: 34.1053 },
  { county: "Siaya", latitude: 0.05, longitude: 34.3 }, // Approximate central point.
  { county: "Kisumu", latitude: -0.0833, longitude: 34.7667 },
  { county: "Homa Bay", latitude: -0.5167, longitude: 34.45 },
  { county: "Migori", latitude: -1.0667, longitude: 34.4667 }, // Approximate central point.
  { county: "Kisii", latitude: -0.6833, longitude: 34.7667 },
  { county: "Nyamira", latitude: -0.6, longitude: 34.95 }, // Approximate central point.
  { county: "Nairobi", latitude: -1.2864, longitude: 36.8172 },
];

// console.log(kenyanCounties);
// Connect to MongoDB
const mongoUrl = "mongodb://localhost:27017/fololimo"
const connectDB = async () => {
  try {
    await mongoose.connect(
      mongoUrl
    );
    console.log("✅ MongoDB Connected");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    process.exit(1);
  }
};
await connectDB();
function extractSoilData(data) {
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

async function getSoilData(lat, lon, county) {
  try {
    const res = await fetch(
      `https://api.isda-africa.com/v1/soilproperty?key=${apiKey}&lat=${lat}&lon=${lon}`
    );
    if (!res.ok) {
      console.error(`⚠️ Failed request for ${county}: ${res.status}`);
      return null;
    }
    return await res.json();
  } catch (error) {
    console.error(`❌ Error fetching data for ${county}:`, error);
    return null;
  }
}

async function createSoilData() {
  for (const county of counties) {
    console.log(`creating  soil data for ${county.county}`);
    try {
      const data = await getSoilData(
        county.latitude,
        county.longitude,
        county.county
      );
      if (!data) continue; // Skip if no data

      const soilData = extractSoilData(data);
      if (!soilData) continue; // Skip if extraction failed

      const newData = new SoilData({ ...soilData, location: county.county });
      await newData.save();
      console.log(`✅ Saved data for ${county.county}`);
    } catch (error) {
      console.error(`❌ Error processing ${county.county}:`, error);
    }
  }
}

// Run process
await createSoilData();
mongoose.connection.close();

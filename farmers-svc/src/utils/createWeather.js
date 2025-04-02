import mongoose from "mongoose";
import { Weather } from "../models/Weather.js";

// // Connect to MongoDB
// const connectDB = async () => {
//   try {
//     await mongoose.connect("mongodb://localhost:27017/fololimo", {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//       connectTimeoutMS: 30000, // Prevent timeout errors
//     });
//     console.log("✅ MongoDB Connected");
//   } catch (error) {
//     console.error("❌ MongoDB connection error:", error);
//     process.exit(1);
//   }
// };

// await connectDB(); // Ensure DB connection before queries
// mongoose.set("bufferCommands", false); // Prevent query buffering
const createWeather = async (city) => {
  try {
    // console.info(`🌍 Fetching weather data for: ${city}`);
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=b1c935d0e5a691ed0a9fd863b39e9783&units=metric`
    );

    if (!res.ok) {
    
      return;
    }

    const data = await res.json();
    if (data.cod !== "200") {
      return;
    }

    const weatherData = extractWeatherData(data, city);
    if (!weatherData) {
      return;
    }

    const weather = new Weather(weatherData);
    await weather.save();
    // console.info(`✅ Weather data saved for ${city}`);
  } catch (error) {
    console.error(`❌ Error creating weather for ${city}:`, error.message);
  }
};

function extractWeatherData(data, city) {
  if (!data || !data.list || data.list.length === 0 || !data.city) {
    return null;
  }

  const firstEntry = data.list[0];
  return {
    temperature: firstEntry.main.temp,
    humidity: firstEntry.main.humidity,
    description: firstEntry.weather[0].description,
    location: city,
  };
}

export const updateAllCountiesWeather = async () => {
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
  const frames = ['-', '\\', '|', '/']; // Frames for the animation
  let i = 0;
  for (const county of counties) {
    process.stdout.write(`\rcreting for ${county} ${frames[i++]}`);
    await createWeather(county);
    i %= frames.length; 
  }
  return "✅ Finished updating weather for all counties!";
};

// await updateAllCountiesWeather();
// mongoose.disconnect(); // Close DB connection when done

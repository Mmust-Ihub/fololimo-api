import express from "express";
import mongoose from "mongoose";
import { config } from "dotenv";
import cors from "cors";
import logger from "morgan";

import { farmScheduleRouter } from "./routes/farmSchedule.routes.js";
import { farmRouter } from "./routes/farm.routes.js";
import { inventoryRouter } from "./routes/inventory.routes.js";
import { userRouter } from "./routes/auth.routes.js";
import { aiRouter } from "./routes/suggest.routes.js";
import { weatherRouter } from "./routes/weather.routes.js";
import { agrovetRouter } from "./routes/agrovet.routes.js";
import { activityRouter } from "./routes/activities.routes.js";
import { auth } from "./middleware/auth.js";
import cookieParser from "cookie-parser";
import { locatioRrouter } from "./routes/location.routes.js";
config();
const app = express();
const PORT = process.env.PORT;

const MONGO_URI = process.env.MONGO_URI;

app.use(cors());
app.use(logger("tiny"));
app.use(express.json());
app.use(cookieParser());

app.get("", (req, res) => {
  res.status(200).json({
    mesage: "server is okay!!",
  });
});
app.use("/api/auth", userRouter);
app.use("/api/ai/schedule", auth, farmScheduleRouter);
app.use("/api/farm", auth, farmRouter);
app.use("/api/inventory", auth, inventoryRouter);
app.use("/api/ai", auth, aiRouter);
app.use("/api/weather", weatherRouter);
app.use("/api/agrovet", auth, agrovetRouter);
app.use("/api/activity", auth, activityRouter);
app.use("/api/location", locatioRrouter);

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("Database connected!!");

    app.listen(PORT, () => {
      console.log("listening on port", PORT);
    });
  })
  .catch((error) => {
    console.error("failed to connect to db: ", error);
    process.exit(1);
  });

import express from "express";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import cors from "cors";
import mongoSanitize from "express-mongo-sanitize";
import compression from "compression";
import xss from "xss-clean";
import createHttpError from "http-errors";
import morgan from "morgan";
import router from "./routes/index.js";
import logger from "./config/logger.js";
// import { createUploadDir} from "./utils/utils.js";
import config from "./config/config.js";

const app = express();

// middlewares
app.use(express.json());
app.use(helmet());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());
app.options("*", cors());
app.use(xss());
app.use(mongoSanitize());
app.use(compression());

if (config.env !== "production") {
  app.use(morgan("dev", {stream: {write: message =>logger.http(message)}}));
}

// createUploadDir()

app.get("/api/healthcheck",  async(req, res, next) => {
    return res.status(200).json({"message": "Hello world"})
})

app.use("/api/v1",  router);

// Error handling
app.use(async (req, res, next) => {
    const error = createHttpError.NotFound("Page not found");
    next(error);
  });

  app.use(async (error, req, res, next) => {
    res.status(error.status || 500).send({
      error: {
        status: error.status || 500,
        message: error.message,
      },
    });
  });
export default app;

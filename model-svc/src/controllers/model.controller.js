import httpStatus from "http-status"
import fs from "fs"
import { catchAsync } from "../utils/catchAsync.js"
import config from "../config/config.js";
import { diseaseObject, pestObject } from "../utils/prompt.js";
import { modelPredict } from "../utils/model.js";

export const predictDisease = catchAsync(async(req, res) => {
    const language = req.query.language !== undefined ? req.query.language : config.language;
    const file = req.file
    const response = await modelPredict(file.path, file.mimetype, diseaseObject[language])
    fs.unlinkSync(file.path)
    if (Object.keys(response).length > 0) {
        return res.status(httpStatus.OK).json(response);
      } else {
        return res.status(httpStatus.BAD_REQUEST).json({"status": "failed", "message": "No disease detected"});
      }
})

export const predictPest = catchAsync(async(req, res) => {
    const language = req.query.language !== undefined ? req.query.language : config.language;
    const file = req.file
    const response = await modelPredict(file.path, file.mimetype, pestObject[language])
    fs.unlinkSync(file.path)
    if (Object.keys(response).length > 0) {
        return res.status(httpStatus.OK).json(response);
      } else {
        return res.status(httpStatus.BAD_REQUEST).json({"status": "failed", "message": "No pest detected"});
      }
})

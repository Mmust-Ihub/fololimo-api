import httpStatus from "http-status"
import { catchAsync } from "../utils/catchAsync.js"
import config from "../config/config.js";
import { diseaseObject, pestObject} from "../utils/prompt.js";
import { chatModel, modelPredict } from "../utils/model.js";
import { uploadImage } from "../utils/utils.js";
import { diseaseModel } from "../models/disease.model.js";
import { sendSMS } from "../utils/sms.js";
import { pestModel } from "../models/pest.model.js";

export const predictDisease = catchAsync(async(req, res, next) => {
    const language = req.query.language !== undefined ? req.query.language : config.language;
    const file = req.files[0]
    const [imageResponse, predictResponse] = await Promise.all([uploadImage(file), modelPredict(file.buffer, file.mimetype, diseaseObject[language])])
    if (Object.keys(predictResponse).length > 0) {
      const data = {...predictResponse, image_url: imageResponse, user_id: req.payload._id}
      // await diseaseModel.create(data)
        return res.status(httpStatus.OK).json(data);
      } else {
        return res.status(httpStatus.BAD_REQUEST).json({"status": "failed", "message": "No disease detected"});
      }
})

export const predictPest = catchAsync(async(req, res) => {
    const language = req.query.language !== undefined ? req.query.language : config.language;
    const file = req.files[0]
    const [imageResponse, predictResponse] = await Promise.all([uploadImage(file), modelPredict(file.buffer, file.mimetype, pestObject[language])])
    if (Object.keys(predictResponse).length > 0) {
      const data = {...predictResponse, image_url: imageResponse, user_id: req.payload._id}
      // await pestModel.create(data)
        return res.status(httpStatus.OK).json(data);
      } else {
        return res.status(httpStatus.BAD_REQUEST).json({"status": "failed", "message": "No disease detected"});
      }
})

export const chatWithModel = catchAsync(async(req, res) => {
  const { query } = req.body
  const modelResponse = await chatModel(query)
  return res.status(200).json(modelResponse)
})

export const chatWithModelSms = catchAsync(async(req, res) => {
  const {text, from} = req.body
  const modelResponse = await chatModel(text)
  await sendSMS(from, modelResponse, config.shortcode)
  return res.sendStatus((httpStatus.OK))
})

// token = e695aa9901c6e369ebae9c8ceba9b234d09dfe64
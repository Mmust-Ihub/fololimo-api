import httpStatus from "http-status"
import { catchAsync } from "../utils/catchAsync.js"
import config from "../config/config.js";
import { diseaseObject, pestObject} from "../utils/prompt.js";
import { chatModel, modelPredict } from "../utils/model.js";
import { uploadImage } from "../utils/utils.js";
import { diseaseModel } from "../models/disease.model.js";
import { sendSMS } from "../utils/sms.js";

export const predictDisease = catchAsync(async(req, res) => {
    const language = req.query.language !== undefined ? req.query.language : config.language;
    const file = req.files[0]
    const [imageResponse, predictResponse] = await Promise.all([uploadImage(file), modelPredict(file.buffer, file.mimetype, diseaseObject[language])])
    if (Object.keys(predictResponse).length > 0) {
      const data = {...predictResponse, image_url: imageResponse}
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
      const data = {...predictResponse, imageUrl: imageResponse}
        return res.status(httpStatus.OK).json(data);
      } else {
        return res.status(httpStatus.BAD_REQUEST).json({"status": "failed", "message": "No disease detected"});
      }
})

export const chatWithModel = catchAsync(async(req, res) => {
  const {text, from} = req.body
  console.log(`received the text: ${text}`)
  const modelResponse = await chatModel(text)
  console.log(modelResponse)
  const smsResponse = await sendSMS(from, modelResponse, config.shortcode)
  console.log("The sms response:", smsResponse)
  return res.sendStatus((httpStatus.OK))
})
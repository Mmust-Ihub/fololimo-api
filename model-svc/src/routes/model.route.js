import {Router} from "express"
import {  chatWithModel, chatWithModelSms, predictDisease, predictPest } from "../controllers/model.controller.js"
import { validateUser } from "../middlewares/authenticateUser.js"

const modelRouter = Router()

modelRouter.post("/disease", predictDisease)
modelRouter.post("/pest", predictPest)
modelRouter.post("/chat",chatWithModel)
modelRouter.post("/chat/sms", chatWithModelSms)

export default modelRouter


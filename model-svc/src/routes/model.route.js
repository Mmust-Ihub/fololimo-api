import {Router} from "express"
import {  chatWithModel, chatWithModelSms, predictDisease, predictPest } from "../controllers/model.controller.js"
import { validateUser } from "../middlewares/authenticateUser.js"

const modelRouter = Router()

modelRouter.post("/disease", validateUser, predictDisease)
modelRouter.post("/pest",validateUser, predictPest)
modelRouter.post("/chat",validateUser, chatWithModel)
modelRouter.post("/chat/sms", chatWithModelSms)

export default modelRouter


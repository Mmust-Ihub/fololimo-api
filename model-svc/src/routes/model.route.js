import {Router} from "express"
import {  predictDisease, predictPest } from "../controllers/model.controller.js"

const modelRouter = Router()
// const upload = multer({storage: storage})

modelRouter.post("/disease", predictDisease)
modelRouter.post("/pest", predictPest)

export default modelRouter


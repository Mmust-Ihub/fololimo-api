import {Router} from "express"
import multer from "multer"
import {  predictDisease, predictPest } from "../controllers/model.controller.js"
import { upload } from "../uploadConfig.js"

const modelRouter = Router()
// const upload = multer({storage: storage})

modelRouter.post("/disease", upload.single("image"), predictDisease)
modelRouter.post("/pest", upload.single("image"), predictPest)

export default modelRouter


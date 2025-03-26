import express from "express"
import { createFarmer } from "../controllers/farmer.controllers.js"

export const farmerRouter = express.Router()

farmerRouter.post("",createFarmer)

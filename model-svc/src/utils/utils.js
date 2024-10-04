import fs from "fs";
import config from "../config/config.js";
import logger from "../config/logger.js";


export const convertToBase = async(filepath) => {
  const base64 = Buffer.from(fs.readFileSync(filepath)).toString("base64")
  return base64
}
export const deletePath = async(filepath) => {

}

export const uploadImage = (filepath) => {

}
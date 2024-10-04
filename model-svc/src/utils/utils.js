import fs from "fs";
import config from "../config/config.js";
import logger from "../config/logger.js";

export const createUploadDir = async () => {
  if (!fs.existsSync(config.upload_dir)) {
    fs.mkdirSync(config.upload_dir);
    logger.info("The directory was created ..")
  }
};

export const convertToBase = async(filepath) => {
  const base64 = Buffer.from(fs.readFileSync(filepath)).toString("base64")
  return base64
}
export const deletePath = async(filepath) => {

}

export const uploadImage = (filepath) => {

}
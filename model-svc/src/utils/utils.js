import config from "../config/config.js";
import { v2 as cloudinary } from "cloudinary";

// Configuration
cloudinary.config({
  cloud_name: config.cloud_name,
  api_key: config.cloud_api_key,
  api_secret: config.cloud_api_secret,
});

export const uploadImage = async (imageFile) => {
  try {
    const imageBuffer = imageFile?.buffer?.toString("base64");
    const response = await cloudinary.uploader.upload(
      `data:${imageFile?.mimetype};base64,${imageBuffer}`,
      {
        folder: "fololimo",
      }
    );
    return response.secure_url;
  } catch (error) {
    throw error;
  }
};

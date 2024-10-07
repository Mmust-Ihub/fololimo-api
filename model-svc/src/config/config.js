import { config } from "dotenv";
import path, { dirname } from "path";
import joi from "joi";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

config({ path: path.join(__dirname, "../../.env") });

const envVarsSchema = joi
  .object()
  .keys({
    NODE_ENV: joi
      .string()
      .valid("production", "development", "testing")
      .required(),
    PORT: joi.number().default(3000),
    GEMINI_API_KEY: joi.string().required().description("Gemini api key"),
    LANGUAGE: joi.string().required().description("The default language"),
    // cloudinary
    CLOUDINARY_CLOUD_NAME: joi.string().required().description("The clodinary cloud name"),
    CLOUDINARY_API_KEY: joi.string().required().description("The cloudinary api key"),
    CLOUDINARY_API_SECRET: joi.string().required().description("The cloudinary api secret"),

    MODEL: joi.string().required().description("The model to be used in prediction"),
    // AT
    APIKEY: joi.string().required().description("Africas Talking api key"),
    AT_USERNAME: joi.string().required().description("Africas Talking AT_USERNAME"),
    SHORTCODE: joi.string().required().description("Message sender"),
    ALPHA: joi.string().required().description("Message sender"),
    URL: joi.string().required().description("Africas Talking request url"),

  })
  .unknown();

const { value: envVars, error } = envVarsSchema
  .prefs({ errors: { label: "key" } })
  .validate(process.env);
if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

export default {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  gemini_api_key: envVars.GEMINI_API_KEY,
  language: envVars.LANGUAGE,
  cloud_name: envVars.CLOUDINARY_CLOUD_NAME,
  cloud_api_key: envVars.CLOUDINARY_API_KEY,
  cloud_api_secret: envVars.CLOUDINARY_API_SECRET,
  model: envVars.MODEL,
  apikey: envVars.APIKEY,
  username: envVars.AT_USERNAME,
  shortcode: envVars.SHORTCODE,
  alpha: envVars.ALPHA,
  url: envVars.URL,
};
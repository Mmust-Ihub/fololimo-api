import {
  ChatSession,
  GoogleGenerativeAI,
  HarmBlockThreshold,
  HarmCategory
} from "@google/generative-ai";
import fs from "fs"
import config from "../config/config.js";
import logger from "../config/logger.js"

const genAI = new GoogleGenerativeAI(config.gemini_api_key);
const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

const safetySettings = [
  {
    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
];

export const modelPredict = async (filepath, mimeType, prompt) => {
  try {
    const chatSession = model.startChat({
      generationConfig,
      safetySettings,
      history: [
        {
          role: "user",
          parts: [
            {
              text: prompt,
            },
          ],
        },
        {
          role: "user",
          parts: [
            {
              inlineData: {
                data: Buffer.from(fs.readFileSync(filepath)).toString("base64"),
                mimeType,
              },
            },
          ],
        },
      ],
    });
    const result = await chatSession.sendMessage("Analyze this image");
    let responseText = result.response.text();
    const jsonMatch = responseText.match(/{.*}/s); // Match the JSON structure
    if (jsonMatch){
        responseText = jsonMatch[0]
    }else{
        logger.info("Invalid response format, no JSON found")
        return {}
    }
    return JSON.parse(responseText)
  } catch (error) {
    logger.error("Error during model prediction or JSON parsing:", error);
    return {};
  }
};

import {
  GoogleGenAI,
  createUserContent,
  createPartFromUri,
  Type,
} from "@google/genai";

export async function analyseImage(file, mimeType, language="english") {
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  try {
    const image = await ai.files.upload({
      file: file,
      config: {
        mimeType: mimeType,
      },
    });
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      systemInstruction: `Analyze the uploaded photo of a plant showing signs of a problem. Identify whether the issue is a disease or a pest, and provide a detailed breakdown of the problem using the following schema:\n\n{\n  "problem_type": "disease or pest",\n  "common_name": "Name of the disease or pest",\n  "affected_crops": ["List of affected crops"],\n  "cause": ["Causes (if disease)", null if pest],\n  "life_cycle": ["Stages of development or infestation"],\n  "remedy": ["Remedies (if disease)", null if pest],\n  "treatment": ["Treatments (if pest)", null if disease],\n  "preventive_measures": ["Prevention strategies for future cases"],\n  "environment_conditions": ["Conditions that favor the problem"],\n  "nutrient_deficiency": ["Related nutrient issues", can be null],\n  "companion_planting": ["Helpful companion plants"],\n  "post_harvest_handling": ["Handling tips after harvest"],\n  "other_crops_infested": ["Other crops this disease affects", null if pest]\n}\nRequirements:\n\nBase your analysis solely on the visible symptoms in the image.\n\nUse agronomic and plant pathology knowledge to infer the likely cause.\n\nIf the problem cannot be confidently classified, use "problem_type": "unknown" and provide notes in a "notes" field (optional).\n\n\nPresent your findings strictly in the JSON format above. Use ${
        language ? "Kiswahili" : "english"
      } \n`,
      contents: [
        createUserContent([createPartFromUri(image.uri, image.mimeType)]),
      ],
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: "object",
          properties: {
            problem_type: {
              type: "string",
              enum: ["disease", "pest"],
              description: "The type of plant problem",
            },
            common_name: {
              type: "string",
              description: "The common name of the disease or pest",
            },
            affected_crops: {
              type: "array",
              items: {
                type: "string",
              },
              description: "List of crops affected by the problem",
            },
            cause: {
              type: "array",
              items: {
                type: "string",
              },
              description: "Causes of the disease (only relevant for diseases)",
              nullable: true,
            },
            life_cycle: {
              type: "array",
              items: {
                type: "string",
              },
              description: "Stages of the disease or pest life cycle",
            },
            remedy: {
              type: "array",
              items: {
                type: "string",
              },
              description: "Remedies for the disease (primarily for diseases)",
              nullable: true,
            },
            treatment: {
              type: "array",
              items: {
                type: "string",
              },
              description: "Treatments for the pest (primarily for pests)",
              nullable: true,
            },
            preventive_measures: {
              type: "array",
              items: {
                type: "string",
              },
              description: "Measures to prevent the problem",
            },
            environment_conditions: {
              type: "array",
              items: {
                type: "string",
              },
              description: "Environmental conditions that favor the problem",
            },
            nutrient_deficiency: {
              type: "array",
              items: {
                type: "string",
              },
              description: "Nutrient deficiencies that may be a factor",
              nullable: true,
            },
            companion_planting: {
              type: "array",
              items: {
                type: "string",
              },
              description: "Companion plants that can help manage the problem",
            },
            post_harvest_handling: {
              type: "array",
              items: {
                type: "string",
              },
              description:
                "Post-harvest handling practices related to the problem",
            },
            other_crops_infested: {
              type: "array",
              items: {
                type: "string",
              },
              description:
                "Other crops that can be infested by the disease (only relevant for diseases)",
              nullable: true,
            },
          },
          required: [
            "problem_type",
            "common_name",
            "affected_crops",
            "life_cycle",
            "preventive_measures",
            "environment_conditions",
            "companion_planting",
            "post_harvest_handling",
          ],
        },
      },
    });
    console.log(response.text);
    return response.text;
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
}
// await main();

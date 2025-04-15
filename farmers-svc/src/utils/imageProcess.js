import {
  GoogleGenAI,
  createUserContent,
  createPartFromUri,
  Type,
} from "@google/genai";

export async function analyseImage(file, mimeType, language = "english") {
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
      systemInstruction: `Analyze the uploaded image and identify agricultural crop diseases or pests. Return results in the required JSON format.

Instructions:
1. Only consider agricultural food crops (exclude ornamentals, houseplants, and non-crop species).
2. If the image is not of an agricultural crop, set "problem_type": null and explain in "notes".
3. If the image shows a crop but no clear disease or pest symptoms, set "problem_type": "unknown" and leave the rest as null (except "crop" if known).
4. Return null values for fields that don't apply to the identified problem
5. If the image shows a clear disease or pest, identify:
  the "crop" affected
  set "problem_type" to "disease" or "pest"
  provide the "pest_or_disease_name" (if known)

Important:
- Only consider agricultural food crops (exclude ornamentals, houseplants, or non-crop species) if the image is non agricultural set problem_type to null
- Base diagnosis solely on visible symptoms in the image
- If the image doesn't show agricultural crops or clear symptoms, set "problem_type" to "unknown"
- Return only the JSON block with no additional text`,
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
              nullable: true,
              description: "The type of plant problem",
            },
            common_name: {
              type: "string",
              nullable: true,
              description: "The common name of the disease or pest",
            },
            affected_crops: {
              type: "array",
              nullable: true,
              items: {
                type: "string",
              },
              description: "List of crops affected by the problem",
            },
            cause: {
              type: "array",
              nullable: true,
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
            notes: {
              type: "string",
              description:
                "If the image is non-agricultural, explain why identification is not applicable and briefly describe the image content. If the image is agricultural but symptoms are unclear, note what evidence is missing or why identification is uncertain.",
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

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
      systemInstruction: `Analyze the uploaded photo of a plant showing visible signs of a problem. Determine if the issue is caused by an **agricultural plant pest or disease** and provide a structured analysis using the following schema:

{
  "problem_type": "disease or pest",
  "common_name": "Name of the disease or pest (must be agriculture-related)",
  "affected_crops": ["List of crops typically affected"],
  "cause": ["Causal agents such as fungi, bacteria, or viruses (only if disease)", null if pest],
  "life_cycle": ["Development stages of the pest or disease progression"],
  "remedy": ["Remedies for diseases", null if pest],
  "treatment": ["Treatments for pests", null if disease],
  "preventive_measures": ["Recommended prevention strategies"],
  "environment_conditions": ["Favorable environmental conditions that promote this problem"],
  "nutrient_deficiency": ["Related nutrient issues if present", can be null],
  "companion_planting": ["Companion plants that help reduce or prevent the issue"],
  "post_harvest_handling": ["Post-harvest handling recommendations to mitigate or prevent further spread"],
  "other_crops_infested": ["Other agricultural crops this disease/pest commonly affects", null if not applicable]
}

Strict Requirements:

1. Only include pests or diseases that affect **agricultural crops or food plants**.
2. **Exclude** any human, animal, ornamental plant, or non-agricultural issues.
3. Use visual plant pathology and entomology knowledge to make an informed classification.
4. If classification is uncertain, use:
   "problem_type": "unknown"
   and optionally add a "notes" field to explain uncertainty.

Output your findings **strictly in the JSON format above**, without any additional explanation or extra text.`,
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

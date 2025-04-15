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
1. Examine the image for signs of disease or pest damage on agricultural crops
2. If the image shows a crop with pest/disease symptoms, identify the problem
3. If the image doesn't show agricultural crops or doesn't display clear symptoms, set "problem_type" to "unknown"
4. Return null values for fields that don't apply to the identified problem

Response format:
{
"has_problem":"true" or  false if the image has problem,
  "problem_type": "disease" ,"pest" or "unknown",
  "common_name": "Name of the disease or pest (must be agriculture-related)",
  "affected_crops": ["List of common agricultural crops affected"],
  "cause": ["Causal agents such as fungi, bacteria, or viruses (if disease)", null if pest or unknown],
  "life_cycle": ["Describe developmental stages of the pest OR progression stages of the disease"],
  "remedy": ["List of suggested control measures or cures if a disease", null if pest or unknown],
  "treatment": ["List of treatment options if a pest (e.g., insecticides, traps, biological control)", null if disease or unknown],
  "preventive_measures": ["List of preventive agricultural strategies (crop rotation, resistant varieties, sanitation, etc.)"],
  "environment_conditions": ["Environmental conditions that favor the spread or appearance of this problem"],
  "nutrient_deficiency": ["Any visible nutrient deficiencies associated or contributing to the issue", null if none or not applicable],
  "companion_planting": ["Beneficial companion plants that reduce pest or disease pressure"],
  "post_harvest_handling": ["Post-harvest strategies to reduce spread, infection, or damage"],
  "other_crops_infested": ["Other agricultural crops commonly affected by this disease or pest", null if not applicable],
"notes": "Explanation of why identification is uncertain or what further evidence is needed."
}

Important:
- Only consider agricultural food crops (exclude ornamentals, houseplants, or non-crop species)
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

            notes: {
              type: "string",
              description:
                "Explanation of why identification is uncertain or what further evidence is needed.",
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

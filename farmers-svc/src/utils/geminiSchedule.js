import { GoogleGenAI, Type } from "@google/genai";

function createPrompt(location, size, crops) {
  return `Generate a detailed farming schedule in JSON format based on the following inputs:\n\nLocation: ${location}\n\nFarm Size: ${size} acres\n\nCrops to be Grown:${crops} \n\nEach activity should include:\n\nName – The name of the farming activity.\n\nStartDate – When the activity should begin.\n\nDuration – The time required to complete the activity.\n\nCost – The average cost for the activity (consider local pricing based on the farm\'s location).\n\nDescription – A brief explanation of what the activity entails and its importance.\n\nEnsure the farming schedule is structured logically from land preparation to marketing and sales, considering best agricultural practices. The output should be a JSON array of objects in the following format:\n\n[\n  {\n    "name": "Land Preparation",\n    "startDate": "YYYY-MM-DD",\n    "duration": "X days",\n    "cost": "XX,XXX - YY,YYY {currency}",\n    "description": "Clearing the land, plowing, and harrowing to create a suitable seedbed for planting."\n  },\n  {\n    "name": "Seed and Fertilizer Purchase",\n    "startDate": "YYYY-MM-DD",\n    "duration": "X days",\n    "cost": "XX,XXX - YY,YYY {currency}",\n    "description": "Buying certified seeds and fertilizers to enrich the soil."\n  }\n]\nAdjust dates based on the best planting season for the given location. If multiple crops are grown, include separate schedules or combine overlapping tasks. The current date is ${new Date()}`;
}
export async function generateSchedule(location, size, crops) {
  const apiKey = process.env.GEMINI_API_KEY;

  const ai = new GoogleGenAI({ apiKey: apiKey });
  try {
    const contents = createPrompt(location, size, crops);
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: contents,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              name: {
                type: Type.STRING,
                description: "Name of the farming activity",
                nullable: false,
              },
              startDate: {
                type: Type.STRING,
                format: "date-time",
                description: "Start date of the activity in YYYY-MM-DD format",
                nullable: false,
              },
              duration: {
                type: Type.STRING,
                description: "Duration of the activity in days",
                nullable: false,
              },
              cost: {
                type: Type.STRING,
                description: "Estimated cost range for the activity",
                nullable: false,
              },
              description: {
                type: Type.STRING,
                description: "Brief explanation of the activity",
                nullable: false,
              },
            },
            required: ["name", "startDate", "duration", "cost", "description"],
          },
        },
      },
    });

    if (!response || !response.text) {
      throw new Error("AI model returned an empty or invalid response.");
    }

    return JSON.parse(response.text);
  } catch (error) {
    console.error("Error generating schedule:", error);
    if (error.message && error.message.includes("JSON")) {
      console.error("Error parsing JSON response from AI.");
    }
    if (error.message && error.message.includes("model")) {
      console.error("Error with the AI model itself.");
    }
    if (error.message && error.message.includes("network")) {
      console.error("Network error while accessing the AI model.");
    }

    return { error: error.message || "An unexpected error occurred." };
  }
}

// main("Mandera", 20);

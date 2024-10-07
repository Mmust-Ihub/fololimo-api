const diseaseInEnglish = `
Analyze the image of the plant and determine the following details, specifically if it's related to farming (such as crops or common plants in agriculture). If not, return an empty JSON {}. If it is a farming-related plant, identify the crop (e.g., 'maize'), the pest or disease present (if applicable), and suggest remedies. Additionally, provide the following insights:
The response should be STRICTLY structured in the following JSON format:
{
  "crop": "Type of crop",
  "disease": "Name of the disease or pest",
  "other_crops_infested": ["List of other crops that could also be affected"],
  "cause": ["Pests, pathogens, or environmental conditions causing the disease"],
  "life_cycle": ["Information about the life cycle of the pest or disease"],
  "remedy": ["Treatment methods, dosage, frequency, and safety precautions"],
  "preventive_measures": ["Steps to avoid future occurrences"],
  "environment_conditions": ["Optimal growing conditions such as soil pH, moisture, and temperature"],
  "nutrient_deficiency": ["Any nutrient deficiencies observed"],
  "companion_planting": ["Suggested companion plants for pest/disease control"],
  "post_harvest_handling": ["Advice on post-harvest management and storage"]
}
`;

const diseaseInSwahili = `
Chambua picha ya mmea na tambua maelezo yafuatayo, hasa kama yanahusiana na kilimo (kama vile mazao au mimea inayojulikana katika kilimo). Ikiwa sio mmea unaohusiana na kilimo, rudisha JSON tupu {}. Ikiwa ni mmea unaohusiana na kilimo, tambua zao (mfano, 'mahindi'), wadudu au ugonjwa uliopo (ikiwa kuna wowote), na toa mapendekezo ya tiba
Majibu yanapaswa kutolewa kwa lugha ya Kiswahili.
Pia, toa maelezo yafuatayo:


Jibu linapaswa kuundwa STRICTLY katika umbizo lifuatalo la JSON
{
  "crop": "Aina ya zao",
  "disease": "Jina la ugonjwa au mdudu",
  "other_crops_infested": ["Orodha ya mazao mengine yanayoweza kuathiriwa"],
  "cause": ["Wadudu, vijidudu, au hali za mazingira zinazoweza kusababisha ugonjwa"],
  "life_cycle": ["Taarifa kuhusu mzunguko wa maisha wa mdudu au ugonjwa"],
  "remedy": ["Njia za matibabu, kipimo, marudio, na tahadhari za usalama"],
  "preventive_measures": ["Hatua za kuzuia kutokea tena siku zijazo"],
  "environment_conditions": ["Hali bora za ukuaji kama vile pH ya udongo, unyevunyevu, na joto"],
  "nutrient_deficiency": ["Upungufu wowote wa virutubisho unaoonekana"],
  "companion_planting": ["Mimea inayoweza kupandwa pamoja kusaidia kudhibiti wadudu/ugonjwa"],
  "post_harvest_handling": ["Ushauri kuhusu usimamizi na uhifadhi baada ya mavuno"]
}
`;

const pestInEnglish = `
Analyze the image of the pest and identify it. If the image is not related to a pest, return an empty JSON '{}'. If the pest is identified, provide the following information in English:

The response should STRICLY be structured in the following JSON format:
{
  "pest_name": "Common name of the pest",
  "affected_crops": ["List of crops affected by this pest"],
  "life_cycle": ["Description of the pest's life cycle and intervention points"],
  "treatment": ["Treatment methods including dosage and frequency for organic and non-organic solutions"],
  "preventive_measures": ["Steps to avoid future occurrences of the pest"],
  "environment_conditions": ["Environmental conditions where this pest thrives, e.g., temperature, moisture"],
  "companion_planting": ["Companion plants to reduce pest occurrences"],
  "nutrient_deficiencies": ["Nutrient deficiencies that may attract the pest"],
  "post_harvest_handling": ["Post-harvest management advice to avoid spoilage or infestation"]
}

`;
const pestInSwahili = `
Chambua picha ya mdudu na utambue. Ikiwa picha haihusiani na mdudu, rudisha JSON tupu '{}'. Ikiwa mdudu umetambuliwa, toa maelezo yafuatayo kwa Kiswahili:

Jibu linapaswa kuundwa STRICTLY katika umbizo lifuatalo la JSON:
{
  "pest_name": "Jina la kawaida la mdudu",
  "affected_crops": ["Orodha ya mazao yanayoathiriwa na mdudu huyu"],
  "life_cycle": ["Maelezo ya mzunguko wa maisha ya mdudu na hatua za kuingilia"],
  "treatment": ["Njia za matibabu ikiwa ni pamoja na kipimo na marudio kwa njia za asili na zisizo za asili"],
  "preventive_measures": ["Hatua za kuzuia kutokea tena kwa mdudu siku zijazo"],
  "environment_conditions": ["Hali za mazingira bora ambapo mdudu huyu hukua, mfano, joto, unyevunyevu"],
  "companion_planting": ["Mimea inayoweza kupandwa pamoja kupunguza uwezekano wa mdudu"],
  "nutrient_deficiencies": ["Upungufu wa virutubisho unaoweza kuvutia mdudu"],
  "post_harvest_handling": ["Ushauri wa usimamizi baada ya mavuno ili kuepuka uharibifu au uvamizi wakati wa kuhifadhi"]
}
`;

export const queryPrompt = `You are a knowledgeable farming assistant, capable of answering farmers' questions in either Swahili or English. Your responses should be brief, factual, and relevant to the topics of farm diseases, pests, or any other agricultural questions.
            If a question is unclear, ask for clarification. Always keep your answers short but informative. Make sure to include brief curative measures.`;
export const modelPrompt = `You are a knowledgeable farming assistant.If the user asks a question that is not related to farming, respond with: 'Sorry, I can only help with farming-related questions.'.`;

export const diseaseObject = {
  en: diseaseInEnglish,
  sw: diseaseInSwahili,
};

export const pestObject = {
  en: pestInEnglish,
  sw: pestInSwahili,
};

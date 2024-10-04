export const diseaseInEnglish = `
Analyze the image of the plant and determine the following details, specifically if it's related to farming (such as crops or common plants in agriculture). If not, return an empty JSON {}. If it is a farming-related plant, identify the crop (e.g., 'maize'), the pest or disease present (if applicable), and suggest remedies. Additionally, provide the following insights:
The response should be structured in the following JSON format:
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

export const diseaseInSwahili = `
Chambua picha ya mmea na tambua maelezo yafuatayo, hasa kama yanahusiana na kilimo (kama vile mazao au mimea inayojulikana katika kilimo). Ikiwa sio mmea unaohusiana na kilimo, rudisha JSON tupu {}. Ikiwa ni mmea unaohusiana na kilimo, tambua zao (mfano, 'mahindi'), wadudu au ugonjwa uliopo (ikiwa kuna wowote), na toa mapendekezo ya tiba
Majibu yanapaswa kutolewa kwa lugha ya Kiswahili.
Pia, toa maelezo yafuatayo:


Majibu yanapaswa kuundwa katika umbizo la JSON lifuatalo:
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
// export const diseaseInSwahili = `
// Chambua picha ya mmea na tambua maelezo yafuatayo, hasa kama yanahusiana na kilimo (kama vile mazao au mimea inayojulikana katika kilimo). Ikiwa sio mmea unaohusiana na kilimo, rudisha JSON tupu {}. Ikiwa ni mmea unaohusiana na kilimo, tambua zao (mfano, 'mahindi'), wadudu au ugonjwa uliopo (ikiwa kuna wowote), na toa mapendekezo ya tiba
// Majibu yanapaswa kutolewa kwa lugha ya Kiswahili.
// Pia, toa maelezo yafuatayo:


// Majibu yanapaswa kuundwa katika umbizo la JSON lifuatalo:
// {
//   "zao": "Aina ya zao",
//   "ugonjwa": "Jina la ugonjwa au mdudu",
//   "mazao_mengine_yanayoathiriwa": ["Orodha ya mazao mengine yanayoweza kuathiriwa"],
//   "sababu": ["Wadudu, vijidudu, au hali za mazingira zinazoweza kusababisha ugonjwa"],
//   "mzunguko_wa_maisha": ["Taarifa kuhusu mzunguko wa maisha wa mdudu au ugonjwa"],
//   "tiba": ["Njia za matibabu, kipimo, marudio, na tahadhari za usalama"],
//   "hatua_za_kinga": ["Hatua za kuzuia kutokea tena siku zijazo"],
//   "mazingira_bora": ["Hali bora za ukuaji kama vile pH ya udongo, unyevunyevu, na joto"],
//   "upungufu_wa_virutubisho": ["Upungufu wowote wa virutubisho unaoonekana"],
//   "kupanda_pamoja": ["Mimea inayoweza kupandwa pamoja kusaidia kudhibiti wadudu/ugonjwa"],
//   "uhifadhi_baada_ya_mavuno": ["Ushauri kuhusu usimamizi na uhifadhi baada ya mavuno"]
// }
// `;
export const pestInEnglish = `
Analyze the image of the pest and identify it. If the image is not related to a pest, return an empty JSON '{}'. If the pest is identified, provide the following information in English:

The response should be structured in the following JSON format:
{
  "pest_name": "Common name of the pest",
  "scientific_name": "Scientific name of the pest",
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
export const pestInSwahili = `
Chambua picha ya mdudu na utambue. Ikiwa picha haihusiani na mdudu, rudisha JSON tupu '{}'. Ikiwa mdudu umetambuliwa, toa maelezo yafuatayo kwa Kiswahili:

Majibu yanapaswa kuundwa katika umbizo la JSON lifuatalo:
{
  "pest_name": "Jina la kawaida la mdudu",
  "scientific_name": "Jina la kisayansi la mdudu",
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
// export const pestInSwahili = `
// Chambua picha ya mdudu na utambue. Ikiwa picha haihusiani na mdudu, rudisha JSON tupu '{}'. Ikiwa mdudu umetambuliwa, toa maelezo yafuatayo kwa Kiswahili:

// Majibu yanapaswa kuundwa katika umbizo la JSON lifuatalo:
// {
//   "jina_la_mdudu": "Jina la kawaida la mdudu",
//   "jina_la_kisayansi": "Jina la kisayansi la mdudu",
//   "mazao_yanayoathiriwa": ["Orodha ya mazao yanayoathiriwa na mdudu huyu"],
//   "mzunguko_wa_maisha": ["Maelezo ya mzunguko wa maisha ya mdudu na hatua za kuingilia"],
//   "tiba": ["Njia za matibabu ikiwa ni pamoja na kipimo na marudio kwa njia za asili na zisizo za asili"],
//   "hatua_za_kinga": ["Hatua za kuzuia kutokea tena kwa mdudu siku zijazo"],
//   "mazingira_bora": ["Hali za mazingira bora ambapo mdudu huyu hukua, mfano, joto, unyevunyevu"],
//   "kupanda_pamoja": ["Mimea inayoweza kupandwa pamoja kupunguza uwezekano wa mdudu"],
//   "upungufu_wa_virutubisho": ["Upungufu wa virutubisho unaoweza kuvutia mdudu"],
//   "uhifadhi_baada_ya_mavuno": ["Ushauri wa usimamizi baada ya mavuno ili kuepuka uharibifu au uvamizi wakati wa kuhifadhi"]
// }
// `;

export const diseaseObject = {
  "en": diseaseInEnglish,
  "sw": diseaseInSwahili
}

export const pestObject = {
  "en": pestInEnglish,
  "sw": pestInSwahili
}
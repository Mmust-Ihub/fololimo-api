<div align="center">

# Backend

<p> The Fololimo Model microservice </p>

**Things to take note of**

#### dev_base_url: https://ihub-mu.vercel.app/

</div>


## Predict Disease

> **request**

- **_url_**: `{{dev_base_url}}/api/v1/model/disease`
- **_method:_** `POST`

- **_Headers:_**

  - `Content-Type: application/json`
  - `Authorization: Bearer <token>`

- **_Optional query parameters:_**

| Parameter |  Type  | options  | Default |
| :-------: | :----: | :------: | :-----: |
| language  | string | en or sw |   en    |

- request body:
  ```json
  "image": "The image to predict"
  ```

> **Response for the english version**

- status code: `200`
- response body:

  ```json
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
    "companion_planting": ["Suggested c+ompanion plants for pest/disease control"],
    "post_harvest_handling": ["Advice on post-harvest management and storage"],
    "image_url": ["The link to the image"]
  }
  ```

  > **Response for the swahili version**

- status code: `200`
- response body:
  ```json
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
    "post_harvest_handling": ["Ushauri kuhusu usimamizi na uhifadhi baada ya mavuno"],
        "image_url": ["The link to the image"]

  }
  ```
## Predict Disease

> **request**

- **_url_**: `{{dev_base_url}}/api/v1/model/pest`
- **_method:_** `POST`

- **_Headers:_**

  - `Content-Type: application/json`
  - `Authorization: Bearer <token>`

- **_Optional query parameters:_**

| Parameter |  Type  | options  | Default |
| :-------: | :----: | :------: | :-----: |
| language  | string | en or sw |   en    |

- request body:
  ```json
  "image": "The image to predict"
  ```

> **Response for the english version**

- status code: `200`
- response body:

  ```json
  {
    "pest_name": "Common name of the pest",
  "affected_crops": ["List of crops affected by this pest"],
  "life_cycle": ["Description of the pest's life cycle and intervention points"],
  "treatment": ["Treatment methods including dosage and frequency for organic and non-organic solutions"],
  "preventive_measures": ["Steps to avoid future occurrences of the pest"],
  "environment_conditions": ["Environmental conditions where this pest thrives, e.g., temperature, moisture"],
  "companion_planting": ["Companion plants to reduce pest occurrences"],
  "nutrient_deficiencies": ["Nutrient deficiencies that may attract the pest"],
  "post_harvest_handling": ["Post-harvest management advice to avoid spoilage or infestation"],
  "image_url": "The image of the url .."
  }
  ```

  > **Response for the swahili version**

- status code: `200`
- response body:
  ```json
  {
    "pest_name": "Jina la kawaida la mdudu",
  "affected_crops": ["Orodha ya mazao yanayoathiriwa na mdudu huyu"],
  "life_cycle": ["Maelezo ya mzunguko wa maisha ya mdudu na hatua za kuingilia"],
  "treatment": ["Njia za matibabu ikiwa ni pamoja na kipimo na marudio kwa njia za asili na zisizo za asili"],
  "preventive_measures": ["Hatua za kuzuia kutokea tena kwa mdudu siku zijazo"],
  "environment_conditions": ["Hali za mazingira bora ambapo mdudu huyu hukua, mfano, joto, unyevunyevu"],
  "companion_planting": ["Mimea inayoweza kupandwa pamoja kupunguza uwezekano wa mdudu"],
  "nutrient_deficiencies": ["Upungufu wa virutubisho unaoweza kuvutia mdudu"],
  "post_harvest_handling": ["Ushauri wa usimamizi baada ya mavuno ili kuepuka uharibifu au uvamizi wakati wa kuhifadhi"],
  "image_url": "The image url"
  }
  ```

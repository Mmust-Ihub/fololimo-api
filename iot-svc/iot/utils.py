import requests, json
from decouple import config
import google.generativeai as genai
from google.generativeai.types import HarmCategory, HarmBlockThreshold
from iot.weather import OpenWeather
from iot.prompt import crop_prompt, model_prompt

genai.configure(api_key=config("GEMINI_API_KEY"))
generation_config = {
  "temperature": 1,
  "top_p": 0.95,
  "top_k": 64,
  "max_output_tokens": 8192,
  "response_mime_type": "application/json",
}

def get_farm_data(farm_id):
    url = f'{config("FARM_URL")}{farm_id}/'
    resp = requests.get(url)
    return resp.json()

def get_weather_data(location):
    data = OpenWeather(location)
    return data.get_relevant_data()


def aggregate_the_data(iot_data, farm_data, weather_data):
    return {
        "soil_data": iot_data,
        "farm data": {
            "location": farm_data.get("location"),
            "size": f"{farm_data.get('size')} ha"
        },
        "weather_data": weather_data
    }

def chat_model(data, farm_id):
    model = genai.GenerativeModel(
        model_name=config("MODEL"),
        generation_config=generation_config,
        safety_settings={
        HarmCategory.HARM_CATEGORY_HATE_SPEECH: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
        HarmCategory.HARM_CATEGORY_HARASSMENT: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
    }
    )
    chat_session = model.start_chat(
        history=[
            {
                "role": "user",
                "parts": [
                    crop_prompt
                ],
            },
            {
                "role": "model",
                "parts": [
                    model_prompt
                ],
            },
        ]
    )
    response = chat_session.send_message(str(data))
    response = json.loads(response.text)
    response["farm_id"] = farm_id
    # return response
    return json.dumps(response, indent=4)

from celery import shared_task
import requests
from .models import Weather
from decouple import config


CITIES = ['Nairobi', 'Mombasa', 'Kisumu']
API_KEY = config("WEATHER_API")

@shared_task
def update_weather_table():
    for city in CITIES:
        response = requests.get(f'https://api.openweathermap.org/data/2.5/weather?q={city}&appid={API_KEY}')
        data = response.json()
        weather, created = Weather.objects.update_or_create(
            city=city,
            defaults={
                'temperature': data['main']['temp'],
                'description': data['weather'][0]['description']
            }
        )
    return "Weather table updated for multiple cities"

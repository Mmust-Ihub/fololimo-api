from django.core.management.base import BaseCommand
from fololimo.models import Weather,City
import requests
from decouple import config
API_KEY = config("WEATHER_API")
class Command(BaseCommand):
    help = 'Update the weather'
    cities = City.objects.all()
    

    def handle(self, *args, **options):
        self.stdout.write(self.style.SUCCESS("Updating weather table"))
        self.update_weather()
    
    def update_weather(self):
        for city in self.cities:
            response = requests.get(f'https://api.openweathermap.org/data/2.5/weather?q={city.city}&appid={API_KEY}&units=metric')
            data = response.json()
            if data['cod'] == '404':
                self.stdout.write(self.style.ERROR(f'City {city.city} not found'))
                continue
            weather, created = Weather.objects.update_or_create(
                city=city,
                defaults={
                    'temperature': data['main']['temp'],
                    'description': data['weather'][0]['description'],
                    'humidity': data['main']['humidity'],
                    'min_temp': data['main']['temp_min'],
                    'max_temp': data['main']['temp_max'],
                    'pressure': data['main']['pressure']
                }
            )
            self.stdout.write(self.style.SUCCESS(f'Weather updated for {city.city}'))
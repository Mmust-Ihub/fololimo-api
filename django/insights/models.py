from django.db import models
from django.conf import settings


class Farm(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    name = models.CharField(max_length=255)
    location = models.CharField(max_length=255)
    size = models.FloatField()
    longitude = models.FloatField()
    latitude = models.FloatField()


class WeatherInsights(models.model):
    pass


class SoilInfomation(models.Model):
    pass
    


class Insight(models.Model):
    pass

class GeminiResponse(models.Model):
    """_summary_

    Args:
        models (_type_): _description_
    """
    pass
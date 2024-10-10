from django.contrib import admin
from .models import Client,Tip,Region,City,SubCounty,Weather

# Register your models here.
admin.site.register(Tip)
admin.site.register(Client)
admin.site.register(Region)
admin.site.register(City)
admin.site.register(SubCounty)
admin.site.register(Weather)
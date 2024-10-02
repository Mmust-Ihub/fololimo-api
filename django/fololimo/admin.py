from django.contrib import admin
from .models import Client,Tip

# Register your models here.
admin.site.register(Tip)
admin.site.register(Client)
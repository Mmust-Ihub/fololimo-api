from django.contrib import admin

from .models import Farm

class FarmAdmin(admin.ModelAdmin):
    list_display = ['name','location','size']

admin.site.register(Farm,FarmAdmin)

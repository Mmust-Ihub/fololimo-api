from django.contrib import admin
from .models import Client,Tip,Region,City,SubCounty,Weather

class ClientAdmin(admin.ModelAdmin):
    list_display = ('name','phone','location','type')
    search_fields = ('name','phone','location','type')
    list_filter = ('type',)

admin.site.register(Tip)
admin.site.register(Client,ClientAdmin)
admin.site.register(Region)
admin.site.register(City)
admin.site.register(SubCounty)
admin.site.register(Weather)
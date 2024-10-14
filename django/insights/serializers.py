from rest_framework import serializers
from .models import Farm
from fololimo.models import City,SubCounty

class FarmSerializer(serializers.ModelSerializer):
    city = serializers.SerializerMethodField() 
    city_name = serializers.SerializerMethodField() 
    
    class Meta:
        model = Farm
        fields =["name","location","size","longitude","latitude","id","city","city_name"]
        
    def get_city(self,obj):
        sub_county = SubCounty.objects.get(sub_county=obj.location)
        city = City.objects.get(city=sub_county.city)
        return city.id
    def get_city_name(self,obj):
        sub_county = SubCounty.objects.get(sub_county=obj.location)
        city = City.objects.get(city=sub_county.city)
        return city.city
    
    def create(self, validated_data):
        farm = Farm.objects.create(**validated_data)
        return farm
        
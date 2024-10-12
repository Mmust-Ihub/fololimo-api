from django.shortcuts import get_object_or_404
from requests import Response
from .models import Client, Tip, Transaction, Region, City, SubCounty, Weather
from rest_framework import viewsets
from .serializers import ClientSerializer, TipSerializer, TransactionSerializer, RegionSerializer, CitySerializer, SubCountySerializer, WeatherSerializer

class ClientViewSet(viewsets.ModelViewSet):
    queryset = Client.objects.all()
    serializer_class = ClientSerializer

class TipViewSet(viewsets.ModelViewSet):
    queryset = Tip.objects.all()
    serializer_class = TipSerializer
    
class TransactionViewSet(viewsets.ModelViewSet):
    queryset = Transaction.objects.all()
    serializer_class = TransactionSerializer

class RegionViewSet(viewsets.ModelViewSet):
    queryset = Region.objects.all()
    serializer_class = RegionSerializer
    
class CityViewSet(viewsets.ModelViewSet):
    queryset = City.objects.all()
    serializer_class = CitySerializer
    
    def list(self, request, *args, **kwargs):
        queryset = City.objects.filter(region__region=request.query_params['region'])
        serializer = CitySerializer(queryset, many=True)
        return Response(serializer.data)

class SubCountyViewSet(viewsets.ModelViewSet):
    queryset = SubCounty.objects.all()
    serializer_class = SubCountySerializer
    
    def list(self, request, *args, **kwargs):
        queryset = SubCounty.objects.filter(city__city=request.query_params['city'])
        serializer = SubCountySerializer(queryset, many=True)
        return Response(serializer.data)
    
class WeatherViewSet(viewsets.ModelViewSet):
    queryset = Weather.objects.all()
    serializer_class = WeatherSerializer
    
    def retrieve(self, request, pk=None):
        queryset = Weather.objects.filter(city=pk)
        serializer = WeatherSerializer(queryset, many=True)
        return Response(serializer.data)


    

from django.urls import path, include
from .views import ClientViewSet, ussd_callback, mpesa_callback
from rest_framework.routers import DefaultRouter
from . import folo_views

router = DefaultRouter()
router.register(r"clients", ClientViewSet, basename="client")
router.register(r"tips", folo_views.TipViewSet, basename="tip")
router.register(r"transactions", folo_views.TransactionViewSet, basename="transaction")
router.register(r"regions", folo_views.RegionViewSet, basename="region")
router.register(r"cities", folo_views.CityViewSet, basename="city")
router.register(r"subcounties", folo_views.SubCountyViewSet, basename="subcounty")
router.register(r"weathers", folo_views.WeatherViewSet, basename="weather")

urlpatterns = [
    path("ussd_callback/", ussd_callback, name="ussd_callback"),
    path("mpesa_callback/", mpesa_callback, name="mpesa_callback"),
    path('cron/update-db/', folo_views.update_db, name='update_db'),
    path("", include(router.urls)),
]

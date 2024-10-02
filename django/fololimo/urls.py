from django.urls import path, include
from .views import ClientViewSet, ussd_callback, mpesa_callback
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r"clients", ClientViewSet, basename="client")

urlpatterns = [
    path("ussd_callback/", ussd_callback, name="ussd_callback"),
    path("mpesa_callback/", mpesa_callback, name="mpesa_callback"),
    path("", include(router.urls)),
]

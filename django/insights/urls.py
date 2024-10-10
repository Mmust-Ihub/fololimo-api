from django.urls import include, path
from . import views
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register('farms', views.FarmViewSet, basename='farms')


urlpatterns = [
    path('',views.index, name="index"),
    path('', include(router.urls))
]
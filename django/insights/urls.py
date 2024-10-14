from django.urls import include, path
from . import views
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register('farms', views.FarmViewSet, basename='farms')
router.register('activities', views.ActivityViewset, basename='activities')


urlpatterns = [
    path('',views.index, name="index"),
    path('farm/<str:id>/',views.get_farm, name="get-farm"),
    path('farms/create/',views.create, name="create-farm"),
    path('', include(router.urls))
]
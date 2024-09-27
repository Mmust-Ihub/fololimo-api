from django.contrib import admin
from django.urls import path, include
from dj_rest_auth import urls

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/v1/', include('dj_rest_auth.urls')),
    path('api/v1/', include('users.urls')),
]

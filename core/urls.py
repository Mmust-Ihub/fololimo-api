from django.contrib import admin
from django.urls import path, include
from dj_rest_auth import urls
from django.conf.urls.static import static
from django.conf import settings

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/v1/users/', include('dj_rest_auth.urls')),
    path('api/v1/', include('users.urls')),
]+ static(settings.STATIC_URL,document_root=settings.STATIC_ROOT)

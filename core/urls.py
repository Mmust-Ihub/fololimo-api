from django.contrib import admin
from django.urls import path, include
from dj_rest_auth import urls
from django.conf.urls.static import static
from django.conf import settings
from dj_rest_auth.registration.views import VerifyEmailView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/v1/users/', include('dj_rest_auth.urls')),
    path('api/v1/users/register', include("dj_rest_auth.registration.urls")),
    path('api/v1/users/account-confirm-email/', VerifyEmailView.as_view(), name='account_email_verification_sent'),
    path('api/v1/', include('users.urls')),
]+ static(settings.STATIC_URL,document_root=settings.STATIC_ROOT)

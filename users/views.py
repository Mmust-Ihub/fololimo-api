from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.viewsets import ModelViewSet
from django.urls import reverse,resolve
from rest_framework.authtoken.models import Token

from .models import User


@api_view(['GET'])
def test(request):
    print(reverse("rest_login")) # type: ignore
    return Response({'message': 'Hello, world!'})


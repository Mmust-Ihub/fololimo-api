from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

@api_view(["GET"])
def index(request):
    return Response({
        "message": "Insights endpoint"
    })



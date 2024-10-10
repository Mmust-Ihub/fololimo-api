from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated
from .models import Farm
from .serializers import FarmSerializer

@api_view(["GET"])
def index(request):
    return Response({
        "message": "Insights endpoint"
    })
    
    
class FarmViewSet(ModelViewSet):
    queryset = Farm.objects.all()
    serializer_class = FarmSerializer
    permission_classes = [IsAuthenticated]
    
    def list(self, request):
        user = request.user
        queryset = Farm.objects.filter(user=user)
        serializer = FarmSerializer(queryset, many=True)
        return Response(serializer.data)
    
    def create(self, request):
        user = request.user
        serializer = FarmSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=user)
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)



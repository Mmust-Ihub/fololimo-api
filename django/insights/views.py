from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from rest_framework import status
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
        print("User: ", user.id)
        queryset = Farm.objects.filter(user__id=user.id)
        serializer = FarmSerializer(queryset, many=True)
        return Response(serializer.data,status=status.HTTP_200_OK)
    
    def create(self, request):
        try:
            user = request.user
            if user.is_anonymous:
            
                return Response({"error": "Authentication credentials were not provided."}, status=status.HTTP_403_FORBIDDEN)

            data = request.data
            data["user"] = user.id
            print("Data: ", data)
            serializer = FarmSerializer(data=data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({
                "message": "something went wrong"
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)



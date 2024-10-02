from django.http import HttpResponse
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view
from .models import Client, Tip
from .serializers import ClientSerializer, TipSerializer
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .mpesa_callback import push_stk


class ClientViewSet(viewsets.ModelViewSet):
    queryset = Client.objects.all()
    serializer_class = ClientSerializer
    permission_classes = [IsAuthenticated]


# function to add farmers
@api_view(["POST"])
def ussd_callback(request):
    session_id = request.POST.get("sessionId")
    service_code = request.POST.get("serviceCode")
    phone_number = request.POST.get("phoneNumber")
    text = request.POST.get("text")
    print(text)
    user_input = text.split("*")
    cpin = None
    response = ""
    client = Client.objects.filter(phone=phone_number).first()
    print(client)
    if text == "":
        response = index()

    elif text == "1":
        if client:
            response = home()
        else:
            response = "END You are not registered. Please register to continue"
    elif text == "2":
        if client:
            response = home()
        else:
            response = register()
            
    elif text == "2*1":
        response = register_farmer()
    elif text == "2*2":
        response = register_agrovet()
        
    elif len(user_input) == 3 and user_input[0] == "2" and user_input[1] == "1":
        client = Client.objects.create(phone=phone_number, type="farmer", name=user_input[-1])
        client.save()
        print(client)
        response = register_location()
    elif len(user_input) == 3 and user_input[0] == "2" and user_input[1] == "2":
        client = Client.objects.create(phone=phone_number, type="agrovet", name=user_input[-1])
        
        client.save()
        print(client)
        response = register_location()
        
    elif len(user_input) == 4 and user_input[0] == "2" and user_input[1] == "1":
        client = Client.objects.filter(phone=phone_number).first()
        client.location = user_input[-1]
        client.save()
        response = home()
        
    elif len(user_input) == 4 and user_input[0] == "2" and user_input[1] == "2":
        client = Client.objects.filter(phone=phone_number).first()
        client.location = user_input[-1]
        client.save()
        response = home()
        
    elif text == "1*1":
        response = get_weather_update()
        
    elif text == "1*2":
        response = getTip()
        
    elif text == "1*3":
        response = "END We are working on this feature. Please check back later"
        
    elif len(user_input) ==5 and user_input[-1] == "3":
        response = "END We are working on this feature. Please check back later"      
    elif len(user_input) ==5 and user_input[-1] == "4":
        response = "END We are working on this feature. Please check back later"      
    elif len(user_input) == 4 and user_input[-1] == "3":
        response = "END We are working on this feature. Please check back later"      
    elif len(user_input) == 4 and user_input[-1] == "4":
        response = "END We are working on this feature. Please check back later"      
    

    return HttpResponse(response)


def index():
    res = "CON Welcome to fololimo\n"
    res += "1. Login\n"
    res += "2. Register\n"
    return res


def register(message="Welcome to Fololimo") -> str:
    res = f"CON {message}\n"
    res += "1. Register as a farmer\n"
    res += "2. Register as an agrovet\n"
    return res


def home():
    res = "CON Welcome back to Fololimo.\n"
    res += "1. View Weather Updates\n"
    res += "2. Get Tips\n"
    res += "3. Get a Loan\n"
    res += "4. Request an Agrovet\n"

    return res


def register_agrovet() -> str:
    res = "CON Enter Your Name"
    return res


def register_farmer() -> str:
    res = "CON Enter Your Name"
    return res
def register_location() -> str:
    res = "CON Enter Your Location"
    return res


def getTip() -> str:
    res = "END "
    res += tip_of_day()
    return res


def tip_of_day():
    tip = Tip.objects.order_by("created_at").first()
    return "Plant your crops in rows. This will make it easier to water and weed and will help you to remember what you planted where."


def get_weather_update():
    res = "END Weather Update: \n"
    res += "Today: 25°C \n"
    res += "Tomorrow: 27°C \n"
    return res

@api_view(["POST"])
def mpesa_callback(request):
    print("Mpesa Callback")
    print(request.data)
    return Response(status=status.HTTP_200_OK)


@api_view(["POST"])
def stk_push(request):
    phone = request.data.get("phone")
    if phone:
        push_stk(phone)
        return Response(status=status.HTTP_200_OK)
    else:
        return Response(status=status.HTTP_400_BAD_REQUEST, data={"message": "Phone number is required"})
        
    

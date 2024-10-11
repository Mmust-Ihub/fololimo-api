import random
from django.http import HttpResponse
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view
from .models import Client, Tip, Region, City, SubCounty, Weather
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
    
    if not client:
        client = Client(phone=phone_number)
        client.save()
    elif user_input[0] == "1" and len(user_input) == 6 and user_input[1] == "1":
        client.name = user_input[5]
        client.save()
        return HttpResponse(success())
    elif user_input[0] == "2" and len(user_input) == 6 and user_input[1] == "1":
        client.name = user_input[5]
        client.save()
        return HttpResponse(success_swahili())
        
    if len(user_input) >= 2 and user_input[1] == "1":
        if client.location or client.name:
            
            response = "END you are already registered"
            return HttpResponse(response)
    if len(user_input) >= 2 and user_input[1] != "1":
        if client.location:
            location = client.location
        else:
            response = "END you are not registered. Please subscribe first"
            return HttpResponse(response)
        
    if len(user_input) >= 3 and user_input[1] == "1":
        region = Region.objects.all()[int(user_input[2])-1]
        
    if len(user_input) >= 4 and user_input[1] == "1":
        counties = City.objects.filter(region=region)
        county = counties[int(user_input[3])-1]
        print("setting county",county)
    if len(user_input) >= 5 and user_input[1] == "1":
        sub_county = SubCounty.objects.filter(city=county)[int(user_input[4])-1]
        client.location = sub_county.sub_county
        client.save()
        print("setting sub-county",county)
         
    
    if text == "":
        response = index()
        return HttpResponse(response)
    elif text == "1":
        response = home()
        return HttpResponse(response)
    elif text == "2":
        response = home_swahili()
        return HttpResponse(response)
    elif text == "1*1":
        response = select_region()
        return HttpResponse(response)
    elif text == "2*1":
        response = select_region_swahili()
        return HttpResponse(response)
    elif user_input[0] == "1" and len(user_input) == 3 and user_input[1] == "1":
        region = Region.objects.all()[int(user_input[2])-1]
        counties = City.objects.filter(region=region)
        response = select_county(counties)
        return HttpResponse(response)
    elif user_input[0] == "2" and len(user_input) == 3 and user_input[1] == "1":
        region = Region.objects.all()[int(user_input[2])-1]
        counties = City.objects.filter(region=region)
        response = select_county(counties)
        return HttpResponse(response)
    elif user_input[0] == "2" and len(user_input) == 4 and user_input[1] == "1":
        # return list of sub counties
        print("county",county)
        sub_counties = SubCounty.objects.filter(city=county)
        print("sub counties",sub_counties)
        response = select_sub_county_swahili(sub_counties=sub_counties)
        return HttpResponse(response)
    elif user_input[0] == "1" and len(user_input) == 4 and user_input[1] == "1":
        # return list of sub counties
        print("county",county)
        sub_counties = SubCounty.objects.filter(city=county)
        print("sub counties",sub_counties)
        response = select_sub_county(sub_counties=sub_counties)
        return HttpResponse(response)
    elif user_input[0] == "1" and len(user_input) == 5 and user_input[1] == "1":
        return HttpResponse(subscribe())
    elif user_input[0] == "2" and len(user_input) == 5 and user_input[1] == "1":
        return HttpResponse(subscribe_swahili())
    
    elif user_input[0] == "1" and len(user_input) == 2 and user_input[1] == "2":
        response = get_agrovet(location)
        return HttpResponse(response)
    elif user_input[0] == "2" and len(user_input) == 2 and user_input[1] == "2":
        response = get_agrovet_swahili(location)
        return HttpResponse(response)
    elif user_input[0] == "2" and len(user_input) == 2 and user_input[1] == "3":
        response = about_swahili()
        return HttpResponse(response)
    elif user_input[0] == "1" and len(user_input) == 2 and user_input[1] == "3":
        response = about()
        return HttpResponse(response)
    elif user_input[0] == "1" and len(user_input) == 2 and user_input[1] == "4":
        response = help()
        return HttpResponse(response)
    elif user_input[0] == "2" and len(user_input) == 2 and user_input[1] == "4":
        response = help_swahili()
        return HttpResponse(response)
    response = "END Invalid choice"
    return HttpResponse(response)


def index():
    res = "CON Welcome to fololimo!!\n"
    res += "Choose a language(Chagua lugha)\n"
    res += "1. English\n"
    res += "2. Kiswahili"
    return res


def home() -> str:
    res = f"CON What do yo\n"
    res += "1. Subscribe to Fololimo.\n"
    res += "2. Get an Agrovet\n"
    res += "3. About\n"
    res += "4. Help\n"
    res += "0. Back\n"
    return res

def home_swahili() -> str:
    res = f"CON Unataka kufanya nini?\n"
    res += "1. Jiandikishe kwa Fololimo.\n"
    res += "2. Pata Agrovet\n"
    res += "3. Kuhusu\n"
    res += "4. Usaidizi\n"
    res += "0. Rudi\n"
    return res

def subscribe() -> str:
    res = "CON Enter your name"
    return res

def subscribe_swahili() -> str:
    res = "CON Ingiza jina lako"
    return res

def get_agrovet() -> str:
    res = "CON Enter your location"
    return res

def get_agrovet_swahili() -> str:
    res = "CON Ingiza eneo lako"
    return res

def about() -> str:
    res = "END Fololimo is a platform that connects farmers to agrovets"
    return res

def about_swahili() -> str:
    res = "END Fololimo ni jukwaa linalounganisha wakulima na agrovets"
    return res

def select_region() -> str:
    res = "CON Select your region\n"
    regions = Region.objects.all()
    i = 1
    for region in regions:
        res += f"{i}. {region.region}\n"
        i += 1
    return res

def select_region_swahili() -> str:
    res = "CON Chagua eneo lako\n"
    regions = Region.objects.all()
    i = 1
    for region in regions:
        res += f"{i}. {region.region}\n"
        i += 1
    return res

def select_county(counties) -> str:
    res = "CON Select your county\n"
    i = 1
    for county in counties:
        res += f"{i}. {county}\n"
        i += 1
    
    return res

def select_county_swahili(counties) -> str:
    res = "CON Chagua kaunti yako:\n" 
    i = 1
    for county in counties:
        res += f"{i}. {county.city}\n"
        i += 1
    return res

def select_sub_county(sub_counties) -> str:
    print("sub counties",sub_counties)
    res = "CON Select your sub county:\n"
    i = 1
    for sub_county in sub_counties:
        res += f"{i}. {sub_county.sub_county}\n"
        i += 1
    return res

def select_sub_county_swahili(sub_counties) -> str:
    res = "CON Chagua eneo bunge lako:\n"
    i = 1
    for sub_county in sub_counties:
        res += f"{i}. {sub_county.sub_county}\n"
        i += 1
    return res

def get_agrovet(location) -> str:
    agrovet = Client.objects.filter(type="agrovet").filter(location=location)
    random_number = random.randint(0, len(agrovet)-1)
    if not agrovet:
        return "END No agrovet found in your location"
    res = f"END Find {agrovet.name} located at {agrovet.location}. Phone: {agrovet.phone}"
    return res

def get_agrovet_swahili(location) -> str:
    agrovet = Client.objects.filter(type="agrovet").filter(location=location).first()
    res = f"END Agrovet wako ni {agrovet.name} aliye katika {agrovet.location}"
    return res

def about() -> str:
    res = "END Fololimo is a platform that connects farmers to agrovets"
    return res

def about_swahili() -> str:
    res = "END Fololimo ni jukwaa linalounganisha wakulima na agrovets"
    return res

def success() -> str:
    res = "END Your subscription was successful. You will receive a confirmation message shortly!!"
    return res

def success_swahili() -> str:
    res = "END Usajili wako umekamilika. Utapokea ujumbe wa uthibitisho hivi karibuni!!"
    return res

def help() -> str:
    res = "END For help contact 0712345678"
    
    return res
def help_swahili() -> str:
    res = "END Kwa msaada zaidi wasiliana na 0712345678"
    
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
        
    

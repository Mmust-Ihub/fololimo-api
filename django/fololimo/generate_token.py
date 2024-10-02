import requests
import base64
from decouple import config


def generate_access_token():
    print("hello")

    consumer_key = config("DARAJA_CONSUMER_KEY")
    consumer_secret = config("DARAJA_CONSUMER_SECRET")
    url = "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials"
    
    try:
        encoded_credentials = base64.b64encode(
            f"{consumer_key}:{consumer_secret}".encode()).decode()
        print("encoded credentials",encoded_credentials)
        headers = {
            "Authorization": f"Basic {encoded_credentials}",
            "Content-Type": "application/json"
        }
        # Send the request and parse the response
        response = requests.get(url, headers=headers)
        print("STATUS CODE: ",response.status_code)
        print("text response= ",response.text)
        print("res errors ",response.content)
        print("json response= ",response.json())

        response = response.json()
        return response["access_token"]

    #     # print("json response= ",response)

    #     print("RESPONSE")
    #     if "access_token" in response.keys():
    #         return response["access_token"]
    #     else:
    #         print(response["error_description"])
    except Exception as e:
        print("status code",response.status_code)
        return response.status_code

# +254 795 290373
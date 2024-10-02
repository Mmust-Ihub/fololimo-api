import pytz
import requests
import base64
from decouple import config
from datetime import datetime, timezone, timedelta
from generate_token import generate_access_token


def push_stk():

    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {generate_access_token()}",
    }

    shortCode = "174379"
    PASSKEY = config("DARAJA_PASSKEY")
    eat_tz = pytz.timezone("Africa/Nairobi")  # EAT timezone
    timestamp = datetime.now(eat_tz).strftime("%Y%m%d%H%M%S")

    payload = {
        "BusinessShortCode": 174379,
        "Password": base64.b64encode(
            (shortCode + PASSKEY + timestamp).encode("utf-8")
        ).decode("utf-8"),
        "Timestamp": timestamp,
        "TransactionType": "CustomerPayBillOnline",
        "Amount": 1,
        "PartyA": 254708374149,
        "PartyB": 174379,
        "PhoneNumber": 254740510778,
        "CallBackURL": "https://sbktr4dg-8000.uks1.devtunnels.ms/api/v1/mpesa_callback/",
        "AccountReference": "Fololimo",
        "TransactionDesc": "Subscription",
    }

    response = requests.request(
        "POST",
        "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest",
        headers=headers,
        json=payload,
    )
    print(response.text.encode("utf8"))


# print
# push_stk()

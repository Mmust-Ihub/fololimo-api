# FOLOLIMO API

This is a Django Rest Framework application for the FOLOLIMO API.

# Project Setup
1. ## Clone this repository

    ```
    git clone https://github.com/Mmust-Ihub/fololimo-api.git
    ```
2. ## Create a virtual environment
    ```
    python -m venv env
    env\Scripts\activate #for windows
    ```
3. ## Install dependencies
    ```
    pip install requirements.txt
    ```
4. ### Create a .env fle in the root of the project and add the following configurations

    ```
    DB_NAME =
    DB_PASSWORD =
    DB_HOST =
    DB_PORT = 5432
    DB_USER =
    ```

5. ### After installing the packages you run the following to   create migrations for the database: 

    ```
    python manage.py makemigrations
    ```
5. ### Run this to migrate the database: 

    ```
    python manage.py migrate
    ```

5. ### After installing the packages you can now run: 

    ```
    python manage.py runserver
    ```
#
<br>

# API DOCUMENTATION

> Root url: [https://fololimo-api-eight.vercel.app](https://fololimo-api-eight.vercel.app)

<br>
<br>

## Authentication


### Account Login
POST:/api/v1/users/login/

>Accept the following POST parameters: username, password Return the REST Framework Token Object's key.

> REQUEST BODY SCHEMA: ***application/json***

```python
{
  "username": "string",
  "email": "user@example.com",
  "password": "string"
}
```
> Responses
>
> Status:201
```python
{
  "username": "string",
  "email": "user@example.com",
  "password": "string"
}
```

### Password Reset

POST:/api/v1/users/password/reset/

>Accepts the following POST parameters: email Returns the success/fail message.
>
>AUTHORIZATIONS:>***Token***
>
>REQUEST BODY SCHEMA: application/json

```python
{
  "email": "user@example.com"
}
```
>Response Samples
>
>Status:201
>
>RESPONSE SCHEMA: application/json

```python
{
  "email": "user@example.com"
}
```
POST:/api/v1/users/password/reset/confirm/
>Password reset e-mail link is confirmed, therefore this resets the user's password.
>
>Accepts the following POST parameters: token, uid, new_password1, new_password2 Returns the success/fail message.
>
>AUTHORIZATIONS>***Token***
>
>REQUEST BODY SCHEMA: application/json

```python
{
  "new_password1": "string",
  "new_password2": "string",
  "uid": "string",
  "token": "string"
}
```

>Reponse Samples
>
>Status:201
>
>RESPONSE SCHEMA: application/json

```python
{
  "new_password1": "string",
  "new_password2": "string",
  "uid": "string",
  "token": "string"
}
```
### Account Registration.
POST:/api/v1/users/register/
This is used when one wants to create an account.

>AUTHORIZATIONS: >***Token***
>
>REQUEST BODY SCHEMA: application/json

```python
{
  "username": "string",
  "email": "user@example.com",
  "password1": "string",
  "password2": "string"
}
```
>Response Samples
>
>Status:201
>
>RESPONSE SCHEMA: application/json

```python
{
  "username": "string",
  "email": "user@example.com",
  "password1": "string",
  "password2": "string"
}
```
#### Account Registration Email

POST:/api/v1/users//register/resend-email/
Account Register Resend Email

This is for requesting for the Email from the user.

>AUTHORIZATIONS:> ***Token***
>
>REQUEST BODY SCHEMA: application/json

```python
{
  "email": "user@example.com"
}
```
>Response Samples
>
>Status:201
>
>RESPONSE SCHEMA: application/json

```python
{
  "email": "user@example.com"
}
```
Account Verify Email when Creating an Account

POST:/api/v1/users//register/verify-email/
>AUTHORIZATIONS:> ***Token***
>
>REQUEST BODY SCHEMA: application/json

```python
{
  "key": "string"
}
```

>Response Samples
>
>Status:201
>
>RESPONSE SCHEMA: application/json

```python
{
  "key": "string"
}
```
Get user details

POST:/api/v1/users/user/
>AUTHORIZATIONS:> ***Token***
>
>REQUEST BODY SCHEMA: application/json

```python
{
  "key": "string"
}
```

>Response Samples
>
>Status:200
>
>RESPONSE SCHEMA: application/json

```python
{
  "username": "my username",
  "email": "email@host.com",
  "firstname":"my firstname",
  "lastname":"my lastname",

}
```

## Farm


### Farm create
POST: /api/v1/insights/farms/

>Accept the following POST parameters: name,location,size,longitude,latitude Returns the created farm object.

> REQUEST BODY SCHEMA: ***application/json***
>AUTHORIZATIONS:> ***Token***

```python
{
  "name": "string",
  "location": "user@example.com",
  "size": float,
  "longitude":float,
  "latitude":float

}
```
> Responses
>
> Status:201
```python
{
  "name": "string",
  "location": "string",
  "size": float,
  "longitude":float,
  "latitude":float
  "id": int,
}
```
### Farms GET
GET: /api/v1/insights/farms/

>Returns a list of farms for the user making the request.

> REQUEST BODY SCHEMA: ***application/json***
>AUTHORIZATIONS:> ***Token***


> Responses
>
> Status:200
```python
[{
  "name": "string",
  "location": "string",
  "size": float,
  "longitude":float,
  "latitude":float
  "id": int,
},
{
  "name": "string",
  "location": "string",
  "size": float,
  "longitude":float,
  "latitude":float
  "id": int,
},....]
```
### Farm GET
GET: /api/v1/insights/farms/{id}

>Return the farm with the specified id.

> REQUEST BODY SCHEMA: ***application/json***
>AUTHORIZATIONS:> ***Token***


> Responses
>
> Status:200
```python

{
  "name": "string",
  "location": "string",
  "size": float,
  "longitude":float,
  "latitude":float
  "id": int,
}
```

## Locations

### Get Regions
>GET : https://fololimo-api-eight.vercel.app/api/v1/fololimo/regions/
>Return a list of all the regions.<br>
>REQUEST BODY SCHEMA: ***application/json***<br>
>AUTHORIZATIONS:> ***Token***
 
 Response: 
 ```
 [
  {
    "id": 7,
    "region": "Central"
  },
  {
    "id": 8,
    "region": "Rift Valley"
  },
  {
    "id": 9,
    "region": "Eastern"
  },
  {
    "id": 10,
    "region": "Nyanza"
  },
  {
    "id": 11,
    "region": "Western"
  },
  {
    "id": 12,
    "region": "Coast"
  },
  {
    "id": 13,
    "region": "North Eastern"
  },
  {
    "id": 14,
    "region": "Nairobi"
  }
]
```

### Get Counties

>GET : https://fololimo-api-eight.vercel.app/api/v1/fololimo/cities/?region={id}<br>
>id is the id of the region.<br>
>Return a list of counties in a region.<br>
>REQUEST BODY SCHEMA: ***application/json***<br>
>AUTHORIZATIONS:> ***Token***

Example Request 
```
https://fololimo-api-eight.vercel.app/api/v1/fololimo/cities/?region=12
```

Example Response
```
[
    {
        "id": 39,
        "city": "Kilifi",
        "region": 12
    },
    {
        "id": 40,
        "city": "Kwale",
        "region": 12
    },
    {
        "id": 41,
        "city": "Lamu",
        "region": 12
    },
    {
        "id": 42,
        "city": "Mombasa",
        "region": 12
    },
    {
        "id": 43,
        "city": "Taita-Taveta",
        "region": 12
    },
    {
        "id": 44,
        "city": "Tana River",
        "region": 12
    }
]
```

### GET Subcounties

>GET : https://fololimo-api-eight.vercel.app/api/v1/fololimo//subcouties/?city={id}<br>
>id is the id of the region.<br>
>Return a list of subcounties in a County.<br>
>REQUEST BODY SCHEMA: ***application/json***<br>
>AUTHORIZATIONS:> ***Token***

Example Request 
```
https://fololimo-api-eight.vercel.app/api/v1/fololimo/subcouties/?city=12
```
Example Response
```
[
  {
    "id": 77,
    "sub_county": "Bomet Central",
    "city": 12
  },
  {
    "id": 78,
    "sub_county": "Bomet East",
    "city": 12
  },
  {
    "id": 79,
    "sub_county": "Chepalungu",
    "city": 12
  },
  {
    "id": 80,
    "sub_county": "Konoin",
    "city": 12
  },
  {
    "id": 81,
    "sub_county": "Sotik",
    "city": 12
  }
]
```

##Weather

### Get city's weather

>GET : https://fololimo-api-eight.vercel.app/api/v1/fololimo/weathers/{id}<br>
>id is the id of the city.<br>
>Return the weather condition for a city.<br>
>REQUEST BODY SCHEMA: ***application/json***<br>
>AUTHORIZATIONS:> ***Token***


example request

```
https://fololimo-api-eight.vercel.app/api/v1/fololimo/weathers/12/
```

Example response

```
{
  "id": 8,
  "temperature": 24.52,
  "description": "clear sky",
  "city": "Bomet",
  "humidity": 34.0,
  "min_temp": 24.52,
  "max_temp": 24.52,
  "pressure": 1015.0
}
```





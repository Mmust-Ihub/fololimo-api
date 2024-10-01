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

> Root url: [https://fololimo-api.onrender.com](https://fololimo-api.onrender.com)

<br>
<br>

## Authentication


### Account Login
POST:https://fololimo-api.onrender.com/api/v1/users/login/

>Accept the following POST parameters: username, password Return the REST Framework Token Object's key.
>
> AUTHORIZATIONS:> ***Token***
>
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

POST:https://fololimo-api.onrender.com/api/v1/users/password/reset/

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
POST:https://fololimo-api.onrender.com/api/v1/users/password/reset/confirm/
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
POST:https://fololimo-api.onrender.com/api/v1/users/register/
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

POST:https://fololimo-api.onrender.com/api/v1/users//register/resend-email/
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

POST:https://fololimo-api.onrender.com/api/v1/users//register/verify-email/
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

POST:https://fololimo-api.onrender.com/api/v1/users/user/
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

<!---
## PROPOSALS

This allows one to fill the available proposals and also create proposals.This is based on the user it may be the Proposer or the Coordinator.

>#### Create Proposals
POST:https://oops-n5cn.onrender.com/api/v1/proposal/add_proposal/
>
>This allows the user to select the desired proposal that they would want to fill.
>
>AUTHORIZATIONS: > ***Token***
>
>Responses
>
>Status:201

>#### Proposal Responses

POST:https://oops-n5cn.onrender.com/api/v1/proposal/add_proposal/answer/
>This allows one to create answers to the selected proposal.
>
>AUHORIZATIONS:> ***Token***
>
>REQUEST BODY SCHEMA: application/json

```python
{
  "answer": "string",
  "proposal": 0,
  "question": 0
}
```
>Response Samples
>
>Status:201
>
>RESPONSE SCHEMA: application/json

```python
{
  "id": 0,
  "answer": "string",
  "proposal": 0,
  "question": 0
}
```
>#### Proposal Assignment

POST:https://oops-n5cn.onrender.com/api/v1/proposal/assign/
>This allows assigning proposals to reviewers.
>
>AUTHORIZATIONS:> ***Token***
>
>REQUEST BODY SCHEMA: application/json

```python
{
  "proposal": 0,
  "reviewer": 0
}
```
>Response Samples
>
>Status:201
>
>RESPONSE SCHEMA: application/json

```python
{
  "id": 0,
  "proposal": 0,
  "reviewer": 0
}
```

>#### Assigned Proposals.

GET:https://oops-n5cn.onrender.com/api/v1/proposal/assignments/
>Returns the assigned proposals to the respective reviewer.
>
>AUTHORIZATIONS:> ***Token***
>
>Responses
>
>Status: 200

>#### Proposal Questions

GET:https://oops-n5cn.onrender.com/api/v1/proposal/get_questions/{id}/
>Returns the questions available for the selected Template identified by the id .
>
>AUTHORIZATIONS:> ***Token***
>
>Responses
>
>Status:200

>#### Proposal List

GET:https://oops-n5cn.onrender.com/api/v1/proposal/my_proposal/
>Returns a list of all submitted proposals from the user making the request.
>
>AUTHORIZATIONS:> ***Token***
>
>Responses
>
>Status:200

>#### Proposal Preview

GET:https://oops-n5cn.onrender.com/api/v1/proposal/preview_proposal/{id}/
>This allows the user to view the questions and the responses given to each question.
>
>AUTHORIZATIONS:> ***Token***
>
>Responses
>
>Status:200

>#### Proposal Review.

GET:https://oops-n5cn.onrender.com/api/v1/proposal/review/{id}
>Returns the review of a proposal identified by ID.
>
>AUTHORIZATIONS:> ***Token***
>
>Responses
>
>Status:200

>#### Proposal Reviewer List

GET:https://oops-n5cn.onrender.com/api/v1/proposal/reviewers/
>This is used to list all the reviewers in the system.
>
>AUTHORIZATIONS:> ***Token***
>
>Responses
>
>Status:200

>#### Proposal Template List

GET:https://oops-n5cn.onrender.com/api/v1/proposal/template/
>It shows the specific proposals created based on their ids.
>
>AUTHORIZATIONS:> ***Token***
>
>Responses
>
>Status:200
```python
[
  {
    "id": 0,
    "title": "string",
    "category": "string"
  }
]
```
>#### Create Proposal

POST:https://oops-n5cn.onrender.com/api/v1/proposal/template/
>This is to create proposals.
>
>AUTHORIZATIONS:> ***Token***
>
>REQUEST BODY SCHEMA: application/json
```python
{
  "title": "string",
  "category": "string"
}
```
>Responses
>
>Status:201
>
>RESPONSE SCHEMA: application/json

```python
{
  "id": 0,
  "title": "string",
  "category": "string"
}
```
>#### Proposal Template Read

GET:https://oops-n5cn.onrender.com/api/v1/proposal/template/{id}/
>This is to view a specific template that has been created.
>
>AUTHORIZATIONS:> ***Token***
>
>Responses
>
>Status:200
>
>RESPONSE SCHEMA: application/json

```python
{
  "id": 0,
  "title": "string",
  "category": "string"
}
```
>#### Update Proposal Template.

PUT:https://oops-n5cn.onrender.com/api/v1/proposal/template/{id}/
>AUTHORIZATIONS:> ***Token***
```python
{
  "title": "string",
  "category": "string"
}
```
>Responses
>
>Status:200
>
>RESPONSE SCHEMA: application/json
```python
{
  "id": 0,
  "title": "string",
  "category": "string"
}
```
>#### Proposal Template Partial Update

PATCH:https://oops-n5cn.onrender.com/api/v1/proposal/template/{id}/
>This is to help in updating a proposal Template.
>
>AUTHORIZATIONS:> ***Token***
>
>REQUEST BODY SCHEMA: application/json
```python
{
  "title": "string",
  "category": "string"
}
```
>Responses
>
>Status:200
>
>RESPONSE SCHEMA: application/json
```python
{
  "id": 0,
  "title": "string",
  "category": "string"
}
```
>#### Proposal Template Delete

DELETE:https://oops-n5cn.onrender.com/api/v1/proposal/template/{id}/
>This is to help in deleting the proposal Templates.
>
>AUTHORIZATIONS:> ***Token***
>
>Responses
>
>Status:204

>#### Proposal Template Read

GET:https://oops-n5cn.onrender.com/api/v1/proposal/templates/{cat}/
>return a list of templates from the selected category.
>
>AUTHORIZATIONS:> ***Token***
>
>Responses
>
>Status:200 -->

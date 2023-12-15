[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-718a45dd9cf7e7f842a935f5ebbe5719a5e09af4491e668f4dbf3b35d5cca122.svg)](https://classroom.github.com/online_ide?assignment_repo_id=13043016&assignment_repo_type=AssignmentRepo)

# P2-Challenge-1 (Server Side)

> Tuliskan API Docs kamu di sini

# Movie API Documentation

## Endpoints :

List of available endpoints:

- `GET /`
- `GET /login`

- `GET /add-user`

- `GET /pub`
- `GET /pub/:id`

- `GET /lodgings`
- `POST /lodgings`
- `GET /lodgings/:id`
- `PUT /lodgings/:id`
- `PATCH /lodgings/:id`
- `DELETE /lodgings/:id`

- `GET /types`
- `POST /types`
- `PUT /types/:id`
- `DELETE /types/:id`

- `GET /users/`

&nbsp;

## 1. GET /

Request:

- body:

```
not needed
```

_Success Response (200 - OK)_
redirected to GET /pub

```json
[
    {
        "id": SERIAL,
        "name": STRING,
        "facility": TEXT,
        "roomCapacity": INTEGER,
        "imgUrl": STRING,
        "location": STRING,
        "price": INTEGER,
        "typeId": INTEGER,
        "authorId": INTEGER,
        "createdAt": DATE,
        "updatedAt": DATE
    },
    {
        "id": SERIAL,
        "name": STRING,
        "facility": TEXT,
        "roomCapacity": INTEGER,
        "imgUrl": STRING,
        "location": STRING,
        "price": INTEGER,
        "typeId": INTEGER,
        "authorId": INTEGER,
        "createdAt": DATE,
        "updatedAt": DATE
    },
    ...
]
```

&nbsp;

## 2. GET /login

Description:

- logging in the user to get access token

Request:

- URL
  /login

- headers:
  not needed

URL Params :

- Required:
  none

Data Params :

none

_Success Response (200 - OK)_

```json
{
    "access_token": STRING
}

```

_Error Response_

- 400 - Invalid Input

```json
{
  "message": "username / email / password is required"
}
```

&nbsp;

## 3. POST /add-user

Description :

- adding a user to the db only by admin

Request:

- URL
  /add-user

- headers:

```json
{
  "Authorization": "Bearer <admin's access token, STRING>"
}
```

URL Params :

- Required:
  none

Data Params :

- body:

```json
{
    "username": STRING,
    "email": STRING,
    "password": STRING,
    "phoneNumber": STRING,
    "address": STRING
}
```

_Success Response (200 - OK)_

```json
{
    "id": INTEGER,
    "username": STRING,
    "email": STRING,
    "role": "Staff",
    "phoneNumber": STRING,
    "address": STRING
}
```

_Error Responses_

- 400 - Invalid Input

```json
{
  "message": "username / email / password is required"
}
OR
{
  "message": [
      "email is required",
      "email must be an email format",
    ]
}
OR
{
  "message": "password is required"
}
OR
{
  "message":  "email must be unique"
}
OR
{
  "message":  "email must be an email format"
}

```

- 400 - Invalid Token

```json
{
  "message": "Invalid Token"
}
```

- 401 - Token Not Found

```json
{
  "message": "Unauthorized Access, must log in first"
}
```

&nbsp;

## 4. GET /pub

Description :

- shows all lodgings data from database

Request:

- URL
  /pub/

- headers:
  not needed

URL Params :

- Required:
  none

- Optional :

  - filter :
    `?filter=<Type's name>`
  - search :
    `?search=<lodging's name>`
  - sort :
    `?sort=<newest>` OR `?sort=<oldest>`
  - page_size :
    `?page_size=<data length wanted (INTEGER)>`
  - page_offset :
    `?page_offset=<data offset wanted (INTEGER)>`

  example of all being used at the same time :
  `?filter=hotel&search=&sort=newest&page_size=3&page_offset=0`

Data Params :

- body:
  none

_Success Response (200 - OK)_

```json
[
    {
        "id": SERIAL,
        "name": STRING,
        "facility": TEXT,
        "roomCapacity": INTEGER,
        "imgUrl": STRING,
        "location": STRING,
        "price": INTEGER,
        "typeId": INTEGER,
        "authorId": INTEGER,
        "createdAt": DATE,
        "updatedAt": DATE
    },
    {
        "id": SERIAL,
        "name": STRING,
        "facility": TEXT,
        "roomCapacity": INTEGER,
        "imgUrl": STRING,
        "location": STRING,
        "price": INTEGER,
        "typeId": INTEGER,
        "authorId": INTEGER,
        "createdAt": DATE,
        "updatedAt": DATE
    },
    ...
]

VARY WITH THE QUERY PARAMS SENT
```

&nbsp;

## 5. GET /pub/:id

Description:

- shows selected lodging data from database, filtered by id as params

Request:

- URL
  /pub/:id

- headers:
  none

URL Params :

Required:

```js
id = INTEGER;
```

_Success Response (200 - OK)_

```json
{
        "id": SERIAL,
        "name": STRING,
        "facility": TEXT,
        "roomCapacity": INTEGER,
        "imgUrl": STRING,
        "location": STRING,
        "price": INTEGER,
        "typeId": INTEGER,
        "authorId": INTEGER,
        "createdAt": DATE,
        "updatedAt": DATE
    }
```

_Error Response_

- 404 - Lodging Not Found

```json
{
  "message": "Lodging not found"
}
```

&nbsp;

## 6. GET /lodgings

Description:

- show all of the lodgings data with users associated without user's password

Request:

- URL
  /lodgings

- headers:

```json
{
  "authorization": "Bearer <any user's access token, STRING>"
}
```

URL Params :

- Required:
  none

Data Params :

none

_Success Response (200 - OK)_

```json
[
    {
        "id": INTEGER,
        "name": STRING,
        "facility": STRING,
        "roomCapacity": INTEGER,
        "imgUrl": STRING,
        "location": STRING,
        "price": INTEGER,
        "typeId": INTEGER,
        "authorId": INTEGER,
        "createdAt": DATE,
        "updatedAt": DATE,
        "User" : {
            "id": INTEGER,
            "username": STRING,
            "email": STRING,
            "role": STRING,
            "phoneNumber": STRING,
            "address": STRING,
            "createdAt": DATE,
            "updatedAt": DATE
        }
    },
        {
        "id": INTEGER,
        "name": STRING,
        "facility": STRING,
        "roomCapacity": INTEGER,
        "imgUrl": STRING,
        "location": STRING,
        "price": INTEGER,
        "typeId": INTEGER,
        "authorId": INTEGER,
        "createdAt": DATE,
        "updatedAt": DATE,
        "User" : {
            "id": INTEGER,
            "username": STRING,
            "email": STRING,
            "role": STRING,
            "phoneNumber": STRING,
            "address": STRING,
            "createdAt": DATE,
            "updatedAt": DATE
        }
    },
    ...
]
```

_Error Responses_

- 401 - Token Not Found

```json
{
  "message": "Unauthorized Access, must log in first"
}
```

- 400 - Invalid Token

```json
{
  "message": "Invalid Token"
}
```

&nbsp;

## 7. POST /lodgings

Description:

- adding lodgings by any user, and make the user's id filled the userId fk

Request:

- URL
  /lodgings

- headers:

```json
{
  "authorization": "Bearer <any user's access token, STRING>"
}
```

URL Params :

- Required:
  none

Data Params :

- Body:

```json
{
    "name": STRING,
    "facility": STRING,
    "roomCapacity": INTEGER,
    "imgUrl": STRING,
    "location": STRING,
    "price": INTEGER,
    "typeId": INTEGER,
}
```

_Success Response (200 - OK)_

```json
    {
        "id": INTEGER,
        "name": STRING,
        "facility": STRING,
        "roomCapacity": INTEGER,
        "imgUrl": STRING,
        "location": STRING,
        "price": INTEGER,
        "typeId": INTEGER,
        "authorId": INTEGER,
        "createdAt": DATE,
        "updatedAt": DATE,
    }
```

_Error Responses_

- 401 - Token Not Found

```json
{
  "message": "Unauthorized Access, must log in first"
}
```

- 400 - Invalid Token

```json
{
  "message": "Invalid Token"
}
```

- 400 - Sequelize ForeignKey Constraint Error

```json
{
  "message": "insert or update on table \"Lodgings\" violates foreign key constraint \"Lodgings_typeId_fkey\""
}
```

- 400 - Sequelize Database Error

```json
{
  "message": "invalid input syntax for type integer: \"[VALUE INPUTTED BY USER]\""
}
```

- 400 - Sequelize Validation Error
  e.g if violating facility's validation or violating facility's and capacity's validation

```json
{
  "message": "Lodging's facility is required"
}
OR
{
  "message": ["Lodging's facility is required", "Lodging's room capacity is required"]
}

```

&nbsp;

## 8. GET /lodgings/:id

Description:

- show specified lodgings data with users associated without user's password

Request:

- URL
  /lodgings/:id

- headers:

```json
{
  "authorization": "Bearer <any user's access token, STRING>"
}
```

URL Params :

- Required:

```js
id = INTEGER;
```

Data Params :

none

_Success Response (200 - OK)_

```json

    {
        "id": INTEGER,
        "name": STRING,
        "facility": STRING,
        "roomCapacity": INTEGER,
        "imgUrl": STRING,
        "location": STRING,
        "price": INTEGER,
        "typeId": INTEGER,
        "authorId": INTEGER,
        "createdAt": DATE,
        "updatedAt": DATE,
        "User" : {
            "id": INTEGER,
            "username": STRING,
            "email": STRING,
            "role": STRING,
            "phoneNumber": STRING,
            "address": STRING,
            "createdAt": DATE,
            "updatedAt": DATE
        }
    }
```

_Error Responses_

- 401 - Token Not Found

```json
{
  "message": "Unauthorized Access, must log in first"
}
```

- 400 - Invalid Token

```json
{
  "message": "Invalid Token"
}
```

- 404 - Lodging Not Found

```json
{
  "message": "Lodging not found"
}
```

&nbsp;

## 9. PUT /lodgings/:id

Description:

- editing multiple field on a specified lodgings

Request:

- URL
  /lodgings/:id

- headers:

```json
{
  "authorization": "Bearer <user in relation with the lodging's id access token, STRING>"
}
OR
{
  "authorization": "Bearer <admin's access token, STRING>"
}
```

URL Params :

- Required:

```js
id = INTEGER;
```

Data Params :

- Body:

```json
{
    "name": STRING,
    "facility": STRING,
    "roomCapacity": INTEGER,
    "imgUrl": STRING,
    "location": STRING,
    "price": INTEGER,
    "typeId": INTEGER,
}
```

_Success Response (200 - OK)_

```json
[
    {
        "id": INTEGER,
        "name": STRING,
        "facility": STRING,
        "roomCapacity": INTEGER,
        "imgUrl": STRING,
        "location": STRING,
        "price": INTEGER,
        "typeId": INTEGER,
        "authorId": INTEGER,
        "createdAt": DATE,
        "updatedAt": DATE,
    }
]
```

_Error Responses_

- 401 - Token Not Found

```json
{
  "message": "Unauthorized Access, must log in first"
}
```

- 400 - Invalid Token

```json
{
  "message": "Invalid Token"
}
```

- 400 - Sequelize ForeignKey Constraint Error

```json
{
  "message": "insert or update on table \"Lodgings\" violates foreign key constraint \"Lodgings_typeId_fkey\""
}
```

- 400 - Sequelize Database Error

```json
{
  "message": "invalid input syntax for type integer: \"[VALUE INPUTTED BY USER]\""
}
```

- 400 - Sequelize Validation Error
  e.g if violating facility's validation or violating facility's and capacity's validation

```json
{
  "message": "Lodging's facility is required"
}
OR
{
  "message": ["Lodging's facility is required", "Lodging's room capacity is required"]
}

```

- 404 - Lodging Not Found

```json
{
  "message": "Lodging not found"
}
```

&nbsp;

## 10. PATCH /lodgings/:id

Description:

- editing imageUrl by uploading an offline image via multer to cloudinary

Request:

- URL
  /lodgings/:id

- headers:

```json
{
  "authorization": "Bearer <user in relation with the lodging's id access token, STRING>"
}
OR
{
  "authorization": "Bearer <admin's access token, STRING>"
}
```

URL Params :

- Required:

```js
id = INTEGER;
```

Data Params :

- File:

```json
{
    "photo": OBJECT
}
```

_Success Response (200 - OK)_

```json
{
  "message": "Lodging <Lodging's name> imageUrl has been updated with <new image URL>"
}
```

_Error Responses_

- 401 - Token Not Found

```json
{
  "message": "Unauthorized Access, must log in first"
}
```

- 400 - Invalid Token

```json
{
  "message": "Invalid Token"
}
```

- 400 - Bad Request

```json
{
  "message": "data is required"
}
```

- 404 - Lodging Not Found

```json
{
  "message": "Lodging not found"
}
```

&nbsp;

## 11. DELETE /lodgings/:id

Description:

- deleting a specified lodging's data

Request:

- URL
  /lodgings/:id

- headers:

```json
{
  "authorization": "Bearer <user in relation with the lodging's id access token, STRING>"
}
OR
{
  "authorization": "Bearer <admin's access token, STRING>"
}
```

URL Params :

- Required:

```js
id = INTEGER;
```

Data Params :

none

_Success Response (200 - OK)_

```json
{
  "message": "Lodging with lodging name: <lodging's target name> has been deleted"
}
```

_Error Responses_

- 401 - Token Not Found

```json
{
  "message": "Unauthorized Access, must log in first"
}
```

- 400 - Invalid Token

```json
{
  "message": "Invalid Token"
}
```

- 404 - Lodging Not Found

```json
{
  "message": "Lodging not found"
}
```

&nbsp;

## 12. GET /types

Description:

- show all of the lodging's type data

Request:

- URL
  /types

- headers:

```json
{
  "authorization": "Bearer <any user's access token, STRING>"
}
```

URL Params :

- Required:
  none

Data Params :

none

_Success Response (200 - OK)_

```json
[
    {
        "id": INTEGER,
        "name": STRING,
        "updatedAt": DATE,
        "createdAt": DATE
    },
    {
        "id": INTEGER,
        "name": STRING,
        "updatedAt": DATE,
        "createdAt": DATE
    }
    ...
]
```

_Error Responses_

- 401 - Token Not Found

```json
{
  "message": "Unauthorized Access, must log in first"
}
```

- 400 - Invalid Token

```json
{
  "message": "Invalid Token"
}
```

&nbsp;

## 13. POST /types

Description:

- adding lodging's type by any user

Request:

- URL
  /types

- headers:

```json
{
  "authorization": "Bearer <any user's access token, STRING>"
}
```

URL Params :

- Required:
  none

Data Params :

- Body:

```json
{
    "name": STRING,
}
```

_Success Response (200 - OK)_

```json
    {
        "id": INTEGER,
        "name": STRING,
        "updatedAt": DATE,
        "createdAt": DATE
    }
```

_Error Responses_

- 401 - Token Not Found

```json
{
  "message": "Unauthorized Access, must log in first"
}
```

- 400 - Invalid Token

```json
{
  "message": "Invalid Token"
}
```

- 400 - Sequelize Validation Error

```json
{
  "message": "lodging type is required"
}
```

&nbsp;

## 14. PUT /types/:id

Description:

- Edit specified lodging's type data

Request:

- URL
  /types/:id

- headers:

```json
{
  "authorization": "Bearer <admin's access token, STRING>"
}
```

URL Params :

- Required:

```js
id = INTEGER;
```

Data Params :

none

_Success Response (200 - OK)_

```json
    {
        "id": INTEGER,
        "name": STRING,
        "createdAt": "2023-12-02T12:14:59.253Z",
        "updatedAt": "2023-12-02T12:19:19.259Z"
    }
```

_Error Responses_

- 401 - Token Not Found

```json
{
  "message": "Unauthorized Access, must log in first"
}
```

- 400 - Invalid Token

```json
{
  "message": "Invalid Token"
}
```

- 404 - Type Not Found

```json
{
  "message": "Lodging's type not found"
}
```

&nbsp;

## 15. DELETE /type/:id

Description:

- deleting a specified lodging's type data

Request:

- URL
  /type/:id

- headers:

```json
{
  "authorization": "Bearer <admin's access token, STRING>"
}
```

URL Params :

- Required:

```js
id = INTEGER;
```

Data Params :

none

_Success Response (200 - OK)_

```json
{
  "message": "Type with type's name: <target type's name> has been deleted"
}
```

_Error Responses_

- 401 - Token Not Found

```json
{
  "message": "Unauthorized Access, must log in first"
}
```

- 400 - Invalid Token

```json
{
  "message": "Invalid Token"
}
```

- 404 - Type Not Found

```json
{
  "message": "Type not found"
}
```

&nbsp;

## 16. GET /user/

Description:

- placeholder endpoint, for testing purposes

Request:

- URL
  /user/

- headers:

```json
{
  "authorization": "Bearer <any user's token>, STRING>"
}
```

URL Params :

none

Data Params :

none

_Success Response (200 - OK)_

```json
{
  "message": "ehehehehehhehehe"
}
```

_Error Responses_

- 401 - Token Not Found

```json
{
  "message": "Unauthorized Access, must log in first"
}
```

- 400 - Invalid Token

```json
{
  "message": "Invalid Token"
}
```

&nbsp;

## NOTES ON TESTING

run 

`npm run test`

OR

`npx jest --detectOpenHandles --runInBand --coverage`

testing the endpoint of 

`PATCH /lodgings/:id`

there will be an occasional error caused by a supertest bug (ECONNABORTED), if you run into this error,redo the test or do the test while isolating the `patch-lodgings-id.test`

## Global Error

_401 - Unauthorized_

```json
{
  "message": "Invalid Token"
}
```

- 403 - Forbidden

```json
{
  "message": "Forbidden, you are not authorized"
}
```

_404 - Not Found_

```json
{
  "message": "Data not found"
}
```

_500 - Internal Server Error_

```json
{
  "message": "Internal server error"
}
```

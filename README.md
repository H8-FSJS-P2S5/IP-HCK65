[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-718a45dd9cf7e7f842a935f5ebbe5719a5e09af4491e668f4dbf3b35d5cca122.svg)](https://classroom.github.com/online_ide?assignment_repo_id=13208385&assignment_repo_type=AssignmentRepo)
# Individual Project Phase 2

### endpoints
- `POST /register`
- `POST /login`

- `GET /foods`
- `GET /carts`
- `PATCH /users/me/upgrade`
- `GET /payment/midtrans/token`
- `POST /foods/:id`
- `DELETE /carts/:id`

### POST /register
- Request
- body:
```json
{
    "name": "string",
    "email": "string",
    "password": "string"
}
```

- Response (201 - Created)
```json
{
    "id": "integer",
    "name": "string",
    "email": "string"
}
```

Response (400 - BadRequest)
```json
{
    "message": "Email must be email format"
},
OR
{
    "message": "Email is required"
},
OR
{
    "message": "Password is required"
},
OR
{
  "message": "Password must be at least 6 characters"
}
```

### POST /login
- Request
- body:
```json
{
    "email": "string",
    "password": "string"
}
```

Response (200 - OK)
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiaWF0IjoxNzA1NTc1MzAzfQ.4_YsasXUrapTp-enB6Hb_5i-1oSzcVOqyw6icsLMnD4"
}
```

Response (401 - Unauthorized)
```json
{
    "message": "Invalid email/password"
},
OR
{
    "message": "Invalid email/password"
}
```

### GET /foods
Response (200 - Ok)
```json
[
    {
        "id": 1,
        "name": "Margherita",
        "veg": true,
        "price": 35000,
        "description": "Cheese",
        "quantity": 1,
        "img": "https://api.pizzahut.io/v1/content/en-in/in-1/images/pizza/margherita.90f9451fd66871fb6f9cf7d506053f18.1.jpg?width=550",
        "categoryId": 7,
        "createdAt": "2024-01-16T09:55:18.472Z",
        "updatedAt": "2024-01-16T09:55:18.472Z"
    },
    ...
]
```

### GET /carts
Response (200 - Ok)
```json
[
    {
        "id": 7,
        "name": "Margherita",
        "price": 35000,
        "createdAt": "2024-01-18T06:43:35.567Z",
        "updatedAt": "2024-01-18T06:43:35.567Z"
    }
]
```

### POST /foods/:id
- Request:
- params
```json
{
    "id": "integer"
}
```

Response (201 - Created)
```json
{
    "id": 8,
    "name": "Margherita",
    "price": 35000,
    "updatedAt": "2024-01-18T11:06:05.033Z",
    "createdAt": "2024-01-18T11:06:05.033Z"
}
```

Response (404 - Not Found)
```json
{
    "message": "Data not found"
}
```

### DELETE /carts/:id
Request:
- params
```json
{
    "id": "integer"
}
```

Response (200 - Ok)
```json
{
    "message": "Success delete item"
}
```

Response (404 - Not Found)
```json
{
    "message": "Data not found"
}
```
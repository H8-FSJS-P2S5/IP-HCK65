[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-718a45dd9cf7e7f842a935f5ebbe5719a5e09af4491e668f4dbf3b35d5cca122.svg)](https://classroom.github.com/online_ide?assignment_repo_id=13208385&assignment_repo_type=AssignmentRepo)
# Individual Project Phase 2



## RESTful endpoints

### POST /register

> Create New User

_Request Header_

```
{
  "access_token": "<your access token>"
}
```

_Request Body_

```
not needed
```

_Response (200)_

```
[
    {
        "fullName" : "string",
        "email" : "string",
        "password" : "string",
    }
]
```

_Response (400 - Bad Request)_

```
{
  "message": "Invalid Token"
}
```

---

### POST /login

> Login User

_Request Header_

```
{
  "access_token": "<your access token>"
}
```

_Request Body_

```
{
  "email": String,
  "password": String,
}
```

_Response (200 - Ok Request)_

```
{
  "access_token": "string"
}
```

_Response (400 - Bad Request)_

```
{
  "message": "Email or Password required"
}
```

---

### GET /movie

> Get all Movie data from database

_Request Header_

```
{
  "access_token": "string"
}
```

_Request Body_

```
{
    "title": string,
    "description": string,
    "Stars": string,
    "GenreId": integer,
    "images": string,
    "year": integer
}
```

_Response (200 - Ok Request)_

```
   {
       "title": string,
        "description": "string"
        "Stars": string,
        "GenreId": integer,
        "images": string,
        "year": integer,
    }
```

_Response (500 - Internal Server Error)_

```
{
  "message": "Internal server error"
}
```
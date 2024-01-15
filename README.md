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


### GET /movie/:id

> Get Movie by Id

_Request Header_

```
{
  "access_token": "string"
}
```

_Request Body_

```
{

    "name": string,
    "headline": string,
    "review": string,
    "UserId": integer,
    "MovieId": integer,
}
```

_Response (200 - Ok Request)_

```
{
    "name": string,
    "headline": string,
    "review": string,
    "UserId": integer,
    "MovieId": integer,
}
```

_Response (500 - Internal Server Error)_

```
{
  "message": "Internal server error"
}
```


### POST /movie/add/review/:id

> Create a new Review by Movie Id

_Request Header_

```
{
  "access_token": "string"
}
```

_Request Body_

```
{
    "name": string,
    "headline": string,
    "review": string,
}
```

_Response (201 - Created)_

```
{
    "name": string,
    "headline": string,
    "review": string,
}
```

_Response (400 - Bad Request)_

```
{
  "message": "title is Required."
}
OR
{
  "message": "content is Required."
}
OR
{
  "message": "MovieId is Required"
}
OR
{
  "message": "GenreId is Required."
}
```

_Response (500 - Internal Server Error)_

```
{
  "message": "Internal server error"
}
```


### GET /movie/detail/review/:id

> Get Review Detail by Movie Id

_Request Header_

```
{
  "access_token": "string"
}
```

_Request Body_

```
{
        "name": string,
        "headline": string,
        "review": string,
        "UserId": integer,
        "MovieId": integer,
}
```

_Response (200 - Ok Request)_

```
    {
        "name": string,
        "headline": string,
        "review": string,
        "UserId": integer,
        "MovieId": integer,
    }
```

_Response (500 - Internal Server Error)_

```
{
  "message": "Internal server error"
}
```


### DELETE /movie/review/delete/:id

> Remove a Review data based on Movie Id

_Request Header_

```
{
  "access_token": "string"
}
```

_Request Body_

```
{
      "name": string,
      "headline": string,
      "review": string,
      "UserId": integer,
      "MovieId": integer,
}
```

_Response (200 - Ok Request)_

```
{
 "message": "Success Delete Review"
}
```

_Response (500 - Internal Server Error)_

```
{
  "message": "Internal server error"
}
```


### PUT /movie/review/edit/:id

> update Review Movie on Database by Movie Id

_Request Header_

```
{
  "access_token": "string"
}
```

_Request Body_

```
{
   "name": string
}
```

_Response (200 - Ok Request)_

```
{
    "message": "Review has been updated!"
}
```

_Response (404 - Not Found)_

```
{
  "message": "Error not found"
}
```

_Response (500 - Internal Server Error)_

```
{
  "message": "Internal server error"
}
```


### GET /movie/review/:id

> Get Review Movie by Id

_Request Header_

```
{
  "access_token": "string"
}
```

_Request Body_

```
{
    "name": string,
    "headline": string,
    "review": string,
}
```

_Response (200 - Ok Request)_

```
    {
      "name": string,
      "headline": string,
      "review": string,
    }
```

_Response (500 - Internal Server Error)_

```
{
  "message": "Internal server error"
}
```


### POST /movies/upgrade-account

> Create a new Payment for Upgrade Acccount

_Request Header_

```
{
  "access_token": "string"
}
```

_Request Body_

```
{
     "token": string,
      "redirect_url": string
}
```

_Response (201 - Created)_

```
{
      "token": string,
      "redirect_url": string
}
```

_Response (500 - Internal Server Error)_

```
{
  "name": "Internal Server Error"
}
```

### PUT /user/status/:id

> update User on Database by User Id

_Request Header_

```
{
  "access_token": "string"
}
```

_Request Body_

```
{
   "status": string
}
```

_Response (200 - Ok Request)_

```
{
    "status": string
}
```

_Response (404 - Not Found)_

```
{
  "message": "Error not found"
}
```

_Response (500 - Internal Server Error)_

```
{
  "message": "Internal server error"
}
```



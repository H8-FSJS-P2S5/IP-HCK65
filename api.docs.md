# Library of Programmer API Documentation

## Using 3 Party API
```
- Google Books
```

## Feature/Package
```
- NodeMailer
- Search Books
- CRUD
```

## Models

### User

```md
- fullName : string, required
- address : string, required
- phoneNumber : string, required
- email : string, required, unique
- password : string, required, min length 5
```

### Favourite

```md
- title : string
- UserId : integer
- BookId : string
- imageUrl : text
- author : string
- publisher : string
- publisherDate : string
- pages : string
- linkReading : string
```

## Relationship

### one-to-Many

Satu User dapat memiliki banyak ReadingList 

## Endpoints

List of available endpoints:

- `POST /users/register`
- `POST /users/login`
- `POST /users/google-login`
- `GET /books/`
- `GET /books/:id`

Routes below need authentication:

- `PUT /users`
- `POST /reading-list`
- `GET /reading-list`
- `DELETE /reading-list/:id`


## 1. POST /users/register

Request:

- body:

```json
{
  "fullName" : "string",
  "address" : "string",
  "phoneNumber" : "string",
  "email" : "string",
  "password" : "string",
  "email": "string",
  "password": "string"
}
```

Response (201 - Created)

```json
{
  "id": "integer",
  "fullName": "sting",
  "email": "string"
}
```

Response (400 - Bad Request)

```json
{
  "message": "Fullname is required"
}
OR
{
  "message": "Address is required"
}
OR
{
  "message": "Phone Number is required"
}
OR
{
  "message": "Email is required"
}
OR
{
  "message": "Invalid email format"
}
OR
{
  "message": "Email must be unique"
}
OR
{
  "message": "Password is required"
}
```

## 2. POST /users/login

Request:

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
  "access_token": "string"
}
```

Response (400 - Bad Request)

```json
{
  "message": "Email is required"
}
OR
{
  "message": "Password is required"
}
```

Response (401 - Unauthorized)

```json
{
  "message": "Invalid email/password"
}
```

## 3. POST /users/google-login

Request:

- body:

```json
{
  "google_token" : "string"
}
```

Response (200 - OK)

```json
{
  "access_token": "string"
}
```

## 4. PUT /users/:id

- Update profile user

Request:

- headers:

```json
{
  "Authorization": "Bearer <string token>"
}
```

- params:

```json
{
  "id": "integer"
}
```

- body:

```json
{
    "fullName": "string",
    "phoneNumber": "string",
    "address": "string",
    "email": "string"
}
```

Response (201 - Created)

```json
{
    "fullName": "string",
    "phoneNumber": "string",
    "address": "string",
    "email": "string"
}
```

## 5. POST /reading-list

Add book to database, at Table Reading List

Request:

- headers:

```json
{
  "Authorization": "Bearer <string token>"
}
```
- body:

```json
{
"title" : "string",
"UserId" :" integer",
"BookId" :" string",
"imageUrl" :" text",
"author" :" string",
"publisher" :" string",
"publisherDate" :" string",
"pages" :" string",
"linkReading" :" string",
}

Response (201 - Created)

```json
  {
    "message" : "Success add book to your reading list"
  }
```

## 6. GET /reading-list

Fetch data books from database

Request:

- headers:

```json
{
  "Authorization": "Bearer <string token>"
}
```

Response (200 - Ok)

```json
[
    {
        "id": 11,
        "title": "The Full Stack Developer",
        "UserId": 1,
        "BookId": "vvd6DwAAQBAJ",
        "imageUrl": "http://books.google.com/books/publisher/content?id=vvd6DwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&imgtk=AFLRE73Pmcucv5M8De_gDzqHQhfCKGyo-o7F4t1T963xmqf8QvoieN-yhMnOGJ4PcAgVafJwsI6GReLD-bojZnpIGAsPfeMwfdILI4bLaeCUyZK2plCcK6lqHXqrcG9ko6kJro_5ZRo-&source=gbs_api",
        "author": "Chris Northwood",
        "publisher": "Apress",
        "publisherDate": "2018-11-19",
        "pages": "348",
        "linkReading": "http://play.google.com/books/reader?id=vvd6DwAAQBAJ&hl=&source=gbs_api",
        "createdAt": "2023-12-18T03:54:03.862Z",
        "updatedAt": "2023-12-18T03:54:03.862Z"
    },
    {
        "id": 12,
        "title": "Full Stack Web Development with Backbone.js",
        "UserId": 1,
        "BookId": "NYbIAwAAQBAJ",
        "imageUrl": "http://books.google.com/books/publisher/content?id=NYbIAwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&imgtk=AFLRE73uhQ7pIxp5lIxDs2mhnpVEGbhoQSitTIGJ2vklTgmrqCbteFPUzqu2qs7HSHgoeJL6Oe85GdVbr04MqL8rcOl5_1v3KwpTGZscRDEcKhSeti7EIZopZBgORLB-PlkoLtpKM2Vt&source=gbs_api",
        "author": "Patrick Mulder",
        "publisher": "\"O'Reilly Media, Inc.\"",
        "publisherDate": "2014-06-10",
        "pages": "194",
        "linkReading": "http://play.google.com/books/reader?id=NYbIAwAAQBAJ&hl=&source=gbs_api",
        "createdAt": "2023-12-18T03:54:08.507Z",
        "updatedAt": "2023-12-18T03:54:08.507Z"
    }
    ...
]
```

## 7. DELETE /reading-list/:id

Delete books from table reading list

Request:

- headers:

```json
{
  "Authorization": "Bearer <string token>"
}
```
- params:

```json
{
  "id": "integer"
}
```

Response (200 - OK)

```json

  {
   "message" :"Book with title ${book.title} success deleted"
  }
```

## 8. GET /books

- Fetch data books from database 3 party API 

Request:

- headers:

```json
{
  "api_key": "string"
}
```

- query:

```json
{
  "q": "string"
}
```

Response (200 - OK)

```json
{
    "kind": "books#volumes",
    "totalItems": 544,
    "items": [
        {
            "kind": "books#volume",
            "id": "GmX8DwAAQBAJ",
            "etag": "0mJtyZ+Y5Mw",
            "selfLink": "https://www.googleapis.com/books/v1/volumes/GmX8DwAAQBAJ",
            "volumeInfo": {
                "title": "10 Skill Wajib Dimiliki oleh Full Stack Developer",
                "authors": [
                    "Tri Rachmadi"
                ],
                "publisher": "Tiga Ebook",
                "publishedDate": "2020-09-11",
                ...
            }
        }
        ...
    ]
}
```

## Global Error

Response (401 - Unauthorized)

```json
{
  "message": "Invalid token"
}
```

Response (403 - Forbidden)

```json
{
  "message": "You are not authorized"
}
```

Response (500 - Internal Server Error)

```json
{
  "message": "Internal server error"
}
```

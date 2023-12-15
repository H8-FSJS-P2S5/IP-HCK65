[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-718a45dd9cf7e7f842a935f5ebbe5719a5e09af4491e668f4dbf3b35d5cca122.svg)](https://classroom.github.com/online_ide?assignment_repo_id=13044485&assignment_repo_type=AssignmentRepo)


# YukBisa API Documentation

## Endpoints : 

##### https://api-ip.gemakusuma.com
AWS EC2

List of available endpoints:

- `POST /register`
- `POST /login`
- `POST /google-login`
- `POST /campaigns`
- `GET /campaigns`
- `GET /campaigns/:id`
- `PUT /campaigns`
- `DELETE /campaigns/:id`

- `POST /invoice`
- `GET /user-information`
- `GET /balance-histories`
- `POST /balance-histories`

&nbsp;

## 1. POST /register

Request:

- headers:

```json
{
  "Authorization": "Bearer TOKEN"
}
```

- body:

```json
{
  "email": "string (required)",
  "fullName": "string (required)",
  "password": "string (required)"
}
```

_Response (201 - Created)_

```json
{
  "id": 4,
  "fullName": "Testing",
  "email": "testing@gmail.comzz",
  "password": "$2b$10$GfK6lm7KGF3zDKyNDrmpfeWSRbzU/mYiRC1sNvw/R6QGwKnIwaKcC",
  "updatedAt": "2023-12-14T20:15:56.394Z",
  "createdAt": "2023-12-14T20:15:56.394Z",
  "role": "staff",
  "balance": 0
}
```

_Response (400 - Bad Request)_

```json
{
  "message": [
    "Please enter your Email",
    "Please enter your Password",
    "Please enter your Full Name"
  ]
}
```

&nbsp;

## 2. POST /login

Request:

- body:

```json
{
  "email": "string (required)",
  "password": "string (required)"
}
```

_Response (200 - OK)_

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzAyNTg0OTg3fQ.SOAcD-AmdK9TpqMHSOvwuMHuIERubTbznEsvj21Fx94"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": [
    "Please enter your email",
    "Please enter your password"
  ]
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": [
    "Email/Password is wrong"
  ]
}
```

&nbsp;

## 3. POST /campaigns

Description:

- create campaign to database

Request:

- headers:

```json
{
  "Authorization": "Bearer TOKEN"
}
```

_Response (201 - OK)_

```json
{
  "id": 6,
  "title": "Title Campaign",
  "description": "Description Campaign",
  "total_fundraising": 10000,
  "image_1": "https://kitabisa.com/_next/image?url=https%3A%2F%2Fimgix.kitabisa.com%2Fmaster%2F79780f98-996a-11ee-9870-f20075e4b480_B2710D1B11C8CFAC.png%3Fauto%3Dformat%26fm%3Dpjpg%26ch%3DWidth%2CDPR%2CSave-Data%2CViewport-Width&w=1080&q=75",
  "image_2": "https://kitabisa.com/_next/image?url=https%3A%2F%2Fimgix.kitabisa.com%2Fmaster%2F79780f98-996a-11ee-9870-f20075e4b480_B2710D1B11C8CFAC.png%3Fauto%3Dformat%26fm%3Dpjpg%26ch%3DWidth%2CDPR%2CSave-Data%2CViewport-Width&w=1080&q=75",
  "image_3": "https://kitabisa.com/_next/image?url=https%3A%2F%2Fimgix.kitabisa.com%2Fmaster%2F79780f98-996a-11ee-9870-f20075e4b480_B2710D1B11C8CFAC.png%3Fauto%3Dformat%26fm%3Dpjpg%26ch%3DWidth%2CDPR%2CSave-Data%2CViewport-Width&w=1080&q=75",
  "remaining_balance": 10000,
  "updatedAt": "2023-12-14T08:57:25.289Z",
  "createdAt": "2023-12-14T08:57:25.289Z"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": [
    "Please enter your title",
    "Please enter your description",
    "Please enter your total_fundraising",
    "Please enter your image_1",
    "Please enter your image_2",
    "Please enter your image_3"
  ]
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid Token"
}
```

&nbsp;

## 4. GET /campaigns

Description:

- Get all campaigns from database

Request:

- headers:

```json
{
  "Authorization": "Bearer TOKEN"
}
```

_Response (200 - OK)_

```json
{
  "data": [
    {
      "id": 1,
      "title": "Obat Obatan dan Makanan untuk Palestina",
      "description": "Kondisi Palestina kian hari semakin memburuk atas semakin besar dan meluasnya area yang terdampak penyerangan oleh Militer Israel. Hal ini semakin memperburuk kondisi warga terdampak atas hak dasar yang harus mereka penuhi seperti Makanan, Air, Kebutuhan Sanitasi dan Obat obatan.\n\nYang paling memprihatinkan adalah kondisi korban serangan langsung yang terdiri dari banyak anak anak dan tidak mendapatkan penanganan yang sebagaimana mestinya akibat dari ketiadaan obat obatan dan peralatan medis lainnya yang sudah hancur akibat serangan yang membabibuta di banyak kawasan bahkan rumah sakit di Palestina.\n\nDisamping itu dengan besarnya populasi yang terkonsentrasi di satu area pengungsian menyebabkan masalah kesehatan lain baik itu sebaran penyakit bawaan ataupun penyakit yang disebabkan oleh kondisi sanitasi yang buruk dan cuaca yang tidak bersahabat.\n\nBanyak dari perwakilan NGO seluruh dunia yang berupaya untuk dapat tetap memasok bahan makanan dan obat obatan untuk dapat memenuhi kebutuhan makanan dan bantuan kesehatan warga yang berada di pengungsian. Mereka terus berkoordinasi dengan banyak pihak diluar Gaza untuk dapat membantu menyediakan kebutuhan tersebut.",
      "total_fundraising": 100000000,
      "image_1": "https://kitabisa.com/_next/image?url=https%3A%2F%2Fimgix.kitabisa.com%2Fmaster%2F79780f98-996a-11ee-9870-f20075e4b480_B2710D1B11C8CFAC.png%3Fauto%3Dformat%26fm%3Dpjpg%26ch%3DWidth%2CDPR%2CSave-Data%2CViewport-Width&w=1080&q=75",
      "image_2": "https://kitabisa.com/_next/image?url=https%3A%2F%2Fimgix.kitabisa.com%2Fmaster%2Fafec0cfb-8dd9-11ee-b4a6-fa9b13de945b_419CEC5737B87363.png%3Fauto%3Dformat%26fm%3Dpjpg%26ch%3DWidth%2CDPR%2CSave-Data%2CViewport-Width&w=1080&q=75",
      "image_3": "https://img.kitabisa.cc/size/938/47700b09-480b-46ee-9d21-0df73269dd52.jpg",
      "remaining_balance": 100000000,
      "createdAt": "2023-12-13T12:53:43.283Z",
      "updatedAt": "2023-12-13T12:53:43.283Z"
    }
    ...
  ]
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid Token"
}
```

&nbsp;

## 5. GET /campaigns/:id

Description:

- Get detail campaigns from database

Request:

- headers:

```json
{
  "Authorization": "Bearer TOKEN"
}
```

- params:

```json
{
  "id": "integer (required)"
}
```

_Response (200 - OK)_

```json
{
  "data": {
    "id": 1,
    "title": "Obat Obatan dan Makanan untuk Palestina",
    "description": "Kondisi Palestina kian hari semakin memburuk atas semakin besar dan meluasnya area yang terdampak penyerangan oleh Militer Israel. Hal ini semakin memperburuk kondisi warga terdampak atas hak dasar yang harus mereka penuhi seperti Makanan, Air, Kebutuhan Sanitasi dan Obat obatan.\n\nYang paling memprihatinkan adalah kondisi korban serangan langsung yang terdiri dari banyak anak anak dan tidak mendapatkan penanganan yang sebagaimana mestinya akibat dari ketiadaan obat obatan dan peralatan medis lainnya yang sudah hancur akibat serangan yang membabibuta di banyak kawasan bahkan rumah sakit di Palestina.\n\nDisamping itu dengan besarnya populasi yang terkonsentrasi di satu area pengungsian menyebabkan masalah kesehatan lain baik itu sebaran penyakit bawaan ataupun penyakit yang disebabkan oleh kondisi sanitasi yang buruk dan cuaca yang tidak bersahabat.\n\nBanyak dari perwakilan NGO seluruh dunia yang berupaya untuk dapat tetap memasok bahan makanan dan obat obatan untuk dapat memenuhi kebutuhan makanan dan bantuan kesehatan warga yang berada di pengungsian. Mereka terus berkoordinasi dengan banyak pihak diluar Gaza untuk dapat membantu menyediakan kebutuhan tersebut.",
    "total_fundraising": 100000000,
    "image_1": "https://kitabisa.com/_next/image?url=https%3A%2F%2Fimgix.kitabisa.com%2Fmaster%2F79780f98-996a-11ee-9870-f20075e4b480_B2710D1B11C8CFAC.png%3Fauto%3Dformat%26fm%3Dpjpg%26ch%3DWidth%2CDPR%2CSave-Data%2CViewport-Width&w=1080&q=75",
    "image_2": "https://kitabisa.com/_next/image?url=https%3A%2F%2Fimgix.kitabisa.com%2Fmaster%2Fafec0cfb-8dd9-11ee-b4a6-fa9b13de945b_419CEC5737B87363.png%3Fauto%3Dformat%26fm%3Dpjpg%26ch%3DWidth%2CDPR%2CSave-Data%2CViewport-Width&w=1080&q=75",
    "image_3": "https://img.kitabisa.cc/size/938/47700b09-480b-46ee-9d21-0df73269dd52.jpg",
    "remaining_balance": 100000000,
    "createdAt": "2023-12-14T19:44:07.468Z",
    "updatedAt": "2023-12-14T19:44:07.468Z"
  }
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid Token"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "error not found"
}
```

&nbsp;

## 6. PUT /campaigns/:id

Description:

- put detail campaigns from database

Request:

- headers:

```json
{
  "Authorization": "Bearer TOKEN"
}
```

- params:

```json
{
  "id": "integer (required)"
}
```

- body:

```json
{
  "title": "string (required)",
  "description": "text (required)",
  "total_fundraising": "integer (required)",
  "image_1": "string (required)",
  "image_2": "string (required)",
  "image_3": "string (required)",
  "remaining_balance": "integer (required)"
}
```

_Response (200 - OK)_

```json
{
  "id": 6,
  "title": "Title Campaign",
  "description": "Description Campaign",
  "total_fundraising": 10000,
  "image_1": "https://kitabisa.com/_next/image?url=https%3A%2F%2Fimgix.kitabisa.com%2Fmaster%2F79780f98-996a-11ee-9870-f20075e4b480_B2710D1B11C8CFAC.png%3Fauto%3Dformat%26fm%3Dpjpg%26ch%3DWidth%2CDPR%2CSave-Data%2CViewport-Width&w=1080&q=75",
  "image_2": "https://kitabisa.com/_next/image?url=https%3A%2F%2Fimgix.kitabisa.com%2Fmaster%2F79780f98-996a-11ee-9870-f20075e4b480_B2710D1B11C8CFAC.png%3Fauto%3Dformat%26fm%3Dpjpg%26ch%3DWidth%2CDPR%2CSave-Data%2CViewport-Width&w=1080&q=75",
  "image_3": "https://kitabisa.com/_next/image?url=https%3A%2F%2Fimgix.kitabisa.com%2Fmaster%2F79780f98-996a-11ee-9870-f20075e4b480_B2710D1B11C8CFAC.png%3Fauto%3Dformat%26fm%3Dpjpg%26ch%3DWidth%2CDPR%2CSave-Data%2CViewport-Width&w=1080&q=75",
  "remaining_balance": 10000,
  "updatedAt": "2023-12-14T08:57:25.289Z",
  "createdAt": "2023-12-14T08:57:25.289Z"
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid Token"
}
```

_Response (400 - Bad Request)_

```json

{
  "message": [
    "Please enter your title",
    "Please enter your description",
    "Please enter your total_fundraising",
    "Please enter your image_1",
    "Please enter your image_2",
    "Please enter your image_3"
  ]
}
```

_Response (404 - Not Found)_

```json
{
  "message": "error not found"
}
```

&nbsp;

## 7. DELETE /campaigns/:id

Description:

- Delete campaigns by id

Request:

- headers:

```json
{
  "Authorization": "Bearer TOKEN"
}
```

- params:

```json
{
  "id": "integer (required)"
}
```

_Response (200 - OK)_

```json
{
  "message": "Sedekah Pendidikan AlQur'an untuk Tahfidz, 1 Huruf 10 Kebaikan success to delete"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "error not found"
}
```

&nbsp;


## 8. POST /invoice

Description:

- create invoice

Request:

- headers:

```json
{
  "Authorization": "Bearer TOKEN"
}
```

_Response (201 - OK)_

```json
{
  "id": "657b6491046597d24c4ac5ff",
  "externalId": "1",
  "userId": "657710f69b07e7080d53849a",
  "description": "Invoice Deposit Saldo",
  "status": "PENDING",
  "merchantName": "Hacktiv8",
  "merchantProfilePictureUrl": "https://xnd-merchant-logos.s3.amazonaws.com/business/production/657710f69b07e7080d53849a-1702302139312.jpeg",
  "amount": 25000,
  "expiryDate": "2023-12-16T20:24:49.762Z",
  "invoiceUrl": "https://checkout-staging.xendit.co/v2/657b6491046597d24c4ac5ff",
  "availableBanks": [
    {
      "bankCode": "MANDIRI",
      "collectionType": "POOL",
      "bankBranch": "Virtual Account",
      "accountHolderName": "HACKTIV8",
      "transferAmount": 25000
    },
    {
      "bankCode": "BRI",
      "collectionType": "POOL",
      "bankBranch": "Virtual Account",
      "accountHolderName": "HACKTIV8",
      "transferAmount": 25000
    },
    {
      "bankCode": "BNI",
      "collectionType": "POOL",
      "bankBranch": "Virtual Account",
      "accountHolderName": "HACKTIV8",
      "transferAmount": 25000
    },
    {
      "bankCode": "PERMATA",
      "collectionType": "POOL",
      "bankBranch": "Virtual Account",
      "accountHolderName": "HACKTIV8",
      "transferAmount": 25000
    },
    {
      "bankCode": "BCA",
      "collectionType": "POOL",
      "bankBranch": "Virtual Account",
      "accountHolderName": "HACKTIV8",
      "transferAmount": 25000
    },
    {
      "bankCode": "SAHABAT_SAMPOERNA",
      "collectionType": "POOL",
      "bankBranch": "Virtual Account",
      "accountHolderName": "HACKTIV8",
      "transferAmount": 25000
    },
    {
      "bankCode": "CIMB",
      "collectionType": "POOL",
      "bankBranch": "Virtual Account",
      "accountHolderName": "HACKTIV8",
      "transferAmount": 25000
    },
    {
      "bankCode": "BSI",
      "collectionType": "POOL",
      "bankBranch": "Virtual Account",
      "accountHolderName": "HACKTIV8",
      "transferAmount": 25000
    },
    {
      "bankCode": "BJB",
      "collectionType": "POOL",
      "bankBranch": "Virtual Account",
      "accountHolderName": "HACKTIV8",
      "transferAmount": 25000
    },
    {
      "bankCode": "BNC",
      "collectionType": "POOL",
      "bankBranch": "Virtual Account",
      "accountHolderName": "HACKTIV8",
      "transferAmount": 25000
    }
  ],
  "availableRetailOutlets": [
    {
      "retailOutletName": "ALFAMART"
    },
    {
      "retailOutletName": "INDOMARET"
    }
  ],
  "availableEwallets": [
    {
      "ewalletType": "SHOPEEPAY"
    },
    {
      "ewalletType": "ASTRAPAY"
    },
    {
      "ewalletType": "JENIUSPAY"
    },
    {
      "ewalletType": "DANA"
    },
    {
      "ewalletType": "LINKAJA"
    },
    {
      "ewalletType": "OVO"
    },
    {
      "ewalletType": "NEXCASH"
    }
  ],
  "availableQrCodes": [
    {
      "qrCodeType": "QRIS"
    }
  ],
  "availableDirectDebits": [
    {
      "directDebitType": "DD_BRI"
    },
    {
      "directDebitType": "DD_MANDIRI"
    }
  ],
  "availablePaylaters": [
    {
      "paylaterType": "KREDIVO"
    },
    {
      "paylaterType": "UANGME"
    },
    {
      "paylaterType": "AKULAKU"
    },
    {
      "paylaterType": "ATOME"
    }
  ],
  "shouldExcludeCreditCard": false,
  "shouldSendEmail": false,
  "created": "2023-12-14T20:24:49.835Z",
  "updated": "2023-12-14T20:24:49.835Z",
  "successRedirectUrl": "https://phase2-gema-ip.web.app/balance-histories",
  "currency": "IDR",
  "reminderDate": "2023-12-15T20:24:49.762Z"
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid Token"
}
```

&nbsp;

## 9. GET /user-information

Description:

- Get user information from database

Request:

- headers:

```json
{
  "Authorization": "Bearer TOKEN"
}
```

_Response (200 - OK)_

```json
{
  "data": {
    "id": 1,
    "role": "admin",
    "email": "gemaadmin@gmail.com",
    "balance": 5000
  }
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid Token"
}
```

&nbsp;


## 10. GET /balance-histories

Description:

- Get balance-histories from database

Request:

- headers:

```json
{
  "Authorization": "Bearer TOKEN"
}
```

_Response (200 - OK)_

```json
{
  "data": [
    {
      "id": 1,
      "transaction_type": 1,
      "total": 5000,
      "user_id": 1,
      "createdAt": "2023-12-14T19:44:56.606Z",
      "updatedAt": "2023-12-14T19:44:56.606Z"
    }
  ]
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid Token"
}
```

&nbsp;


## 11. POST /balance-histories

Description:

- Post balance-histories from database

Request:

- headers:

```json
{
  "Authorization": "Bearer TOKEN"
}
```

_Response (200 - OK)_

```json
{
  "data": {
    "id": 2,
    "transaction_type": 1,
    "user_id": 1,
    "total": 5000,
    "updatedAt": "2023-12-14T20:27:54.056Z",
    "createdAt": "2023-12-14T20:27:54.056Z"
  }
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid Token"
}
```

&nbsp;


## Global Error

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal server error"
}
```



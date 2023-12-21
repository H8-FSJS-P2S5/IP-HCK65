# Pitch+ API Documentation

## Models

### User

```md
- email : string, required
- password : string, required
- name : string, required
- imageUrl : string, required
- profileUrl : string, required
```

## Endpoints

List of available endpoints:

- `GET /auth/spotify/sign-in`
- `GET /auth/spotify/callback`

Routes below need authentication & authorization:

- `GET users/my-profile`
- `GET users/topTracks`
- `GET users/topArtists`
- `GET users/reccommendByTracks`
- `GET users/reccommendByArtists`
- `POST users/addTracks`

## 1. GET /auth/spotify/sign-in

Request

- body:

```json

```

Response

```json
Will redirect to Spotify authorization page.
```

<!-- Response (400 - Bad Request)

```json
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
``` -->

## 2. GET /auth/spotify/callback

Request

- body:

```json

```

Response (200 - OK)

```json
Will redirect to Pitch+ homepage.
```

Response (400 - Bad Request)

```json
{
  "body": {
    "error": "invalid_request",
    "error_description": "code must be supplied"
  },
  "headers": {
    "date": "current_date",
    "content-type": "string",
    "set-cookie": [
      "string"
    ],
    "sp-trace-id": "string",
    "x-envoy-upstream-service-time": "string",
    "server": "string",
    "strict-transport-security": "max-age=integer",
    "x-content-type-options": "string",
    "content-encoding": "string",
    "vary": "string",
    "via": "string",
    "alt-svc": "h3=string; ma=integer,h3-29=string; ma=integer",
    "connection": "string",
    "transfer-encoding": "string"
  },
  "statusCode": 400
}


```


## 3. GET users/my-profile

Description:

- Fetch user profile information

Request

- headers:

```json
{
  "Authorization": "<string token>"
}
```

Response (200 - OK)

```json
{
    "body": {
        "display_name": "api",
        "external_urls": {
            "spotify": "https://open.spotify.com/user/rafizuaf"
        },
        "href": "https://api.spotify.com/v1/users/rafizuaf",
        "id": "rafizuaf",
        "images": [
            {
                "url": "https://i.scdn.co/image/ab67757000003b82bd4bea126bfc71c211fd3aab",
                "height": 64,
                "width": 64
            },
            {
                "url": "https://i.scdn.co/image/ab6775700000ee85bd4bea126bfc71c211fd3aab",
                "height": 300,
                "width": 300
            }
        ],
        "type": "user",
        "uri": "spotify:user:rafizuaf",
        "followers": {
            "href": null,
            "total": 24
        },
        "country": "ID",
        "product": "premium",
        "explicit_content": {
            "filter_enabled": false,
            "filter_locked": false
        },
        "email": "mukhtar.r.f@gmail.com"
    },
    "headers": {
        "content-type": "application/json; charset=utf-8",
        "cache-control": "private, max-age=0",
        "vary": "Authorization",
        "x-robots-tag": "noindex, nofollow",
        "access-control-allow-origin": "*",
        "access-control-allow-headers": "Accept, App-Platform, Authorization, Content-Type, Origin, Retry-After, Spotify-App-Version, X-Cloud-Trace-Context, client-token, content-access-token",
        "access-control-allow-methods": "GET, POST, OPTIONS, PUT, DELETE, PATCH",
        "access-control-allow-credentials": "true",
        "access-control-max-age": "604800",
        "content-encoding": "gzip",
        "strict-transport-security": "max-age=31536000",
        "x-content-type-options": "nosniff",
        "date": "Thu, 21 Dec 2023 10:53:28 GMT",
        "server": "envoy",
        "via": "HTTP/2 edgeproxy, 1.1 google",
        "alt-svc": "h3=\":443\"; ma=2592000,h3-29=\":443\"; ma=2592000",
        "connection": "close",
        "transfer-encoding": "chunked"
    },
    "statusCode": 200
}
```

Response (401 - Invalid Token)

```json
{
  "body": {
    "error": {
      "status": 401,
      "message": "The access token expired"
    }
  },
  "headers": {
    "www-authenticate": "Bearer realm=\"spotify\", error=\"invalid_token\", error_description=\"The access token expired\"",
    "access-control-allow-origin": "*",
    "access-control-allow-headers": "Accept, App-Platform, Authorization, Content-Type, Origin, Retry-After, Spotify-App-Version, X-Cloud-Trace-Context, client-token, content-access-token",
    "access-control-allow-methods": "GET, POST, OPTIONS, PUT, DELETE, PATCH",
    "access-control-allow-credentials": "true",
    "access-control-max-age": "604800",
    "content-type": "application/json",
    "content-encoding": "gzip",
    "strict-transport-security": "max-age=31536000",
    "x-content-type-options": "nosniff",
    "date": "Thu, 21 Dec 2023 10:52:59 GMT",
    "server": "envoy",
    "via": "HTTP/2 edgeproxy, 1.1 google",
    "alt-svc": "h3=\":443\"; ma=2592000,h3-29=\":443\"; ma=2592000",
    "connection": "close",
    "transfer-encoding": "chunked"
  },
  "statusCode": 401
}
```

## 4. GET users/topTracks

Description:

- Get 10 most played songs from last 4 weeks

### Request

```json

type: string

The type of entity to return. Valid values: artists or tracks
values: "tracks"

time_range: string
Over what time frame the affinities are computed. Valid values: long_term (calculated from several years of data and including all new data as it becomes available), medium_term (approximately last 6 months), short_term (approximately last 4 weeks). Default: medium_term
Default: time_range=medium_term
Example: time_range=medium_term

limit: integer
The maximum number of items to return. Default: 20. Minimum: 1. Maximum: 50.
Default: limit=20
Range: 0 - 50
Example: limit=10

offset: integer
The index of the first item to return. Default: 0 (the first item). Use with limit to get the next set of items.
Default: offset=0
Example: offset=5
```

Response (200 - OK)

```json
[
    {
        "album": {
            "album_type": "ALBUM",
            "artists": [
                {
                    "external_urls": {
                        "spotify": "https://open.spotify.com/artist/0zuIBB0gRxp4i4E2gvrcoM"
                    },
                    "href": "https://api.spotify.com/v1/artists/0zuIBB0gRxp4i4E2gvrcoM",
                    "id": "0zuIBB0gRxp4i4E2gvrcoM",
                    "name": "The Adams",
                    "type": "artist",
                    "uri": "spotify:artist:0zuIBB0gRxp4i4E2gvrcoM"
                }
            ],
            "available_markets": ["array of strings"],
            "external_urls": {
                "spotify": "https://open.spotify.com/album/6EjtRvsWa1wRYJgeJOROI3"
            },
            "href": "https://api.spotify.com/v1/albums/6EjtRvsWa1wRYJgeJOROI3",
            "id": "6EjtRvsWa1wRYJgeJOROI3",
            "images": [
                {
                    "height": 640,
                    "url": "https://i.scdn.co/image/ab67616d0000b273848d417028ad1eb2f8ff9c26",
                    "width": 640
                },
                {
                    "height": 300,
                    "url": "https://i.scdn.co/image/ab67616d00001e02848d417028ad1eb2f8ff9c26",
                    "width": 300
                },
                {
                    "height": 64,
                    "url": "https://i.scdn.co/image/ab67616d00004851848d417028ad1eb2f8ff9c26",
                    "width": 64
                }
            ],
            "name": "Agterplaas",
            "release_date": "2019-03-15",
            "release_date_precision": "day",
            "total_tracks": 11,
            "type": "album",
            "uri": "spotify:album:6EjtRvsWa1wRYJgeJOROI3"
        },
        "artists": [
            {
                "external_urls": {
                    "spotify": "https://open.spotify.com/artist/0zuIBB0gRxp4i4E2gvrcoM"
                },
                "href": "https://api.spotify.com/v1/artists/0zuIBB0gRxp4i4E2gvrcoM",
                "id": "0zuIBB0gRxp4i4E2gvrcoM",
                "name": "The Adams",
                "type": "artist",
                "uri": "spotify:artist:0zuIBB0gRxp4i4E2gvrcoM"
            }
        ],
        "available_markets": ["array of strings"],
        "disc_number": 1,
        "duration_ms": 299093,
        "explicit": false,
        "external_ids": {
            "isrc": "TCAEC1904822"
        },
        "external_urls": {
            "spotify": "https://open.spotify.com/track/2bEuh25NMtUEQGu6VqohPu"
        },
        "href": "https://api.spotify.com/v1/tracks/2bEuh25NMtUEQGu6VqohPu",
        "id": "2bEuh25NMtUEQGu6VqohPu",
        "is_local": false,
        "name": "Timur",
        "popularity": 62,
        "preview_url": "https://p.scdn.co/mp3-preview/c3bf2fd7a240abb5221f47cb5c795923dcc00f2b?cid=d86db55895ca45319957a258fac15a79",
        "track_number": 11,
        "type": "track",
        "uri": "spotify:track:2bEuh25NMtUEQGu6VqohPu"
    },
    ...,
]
```

Response (401 - Invalid Token)

```json
{
  "body": {
    "error": {
      "status": 401,
      "message": "The access token expired"
    }
  },
  "headers": {
    "www-authenticate": "Bearer realm=\"spotify\", error=\"invalid_token\", error_description=\"The access token expired\"",
    "access-control-allow-origin": "*",
    "access-control-allow-headers": "Accept, App-Platform, Authorization, Content-Type, Origin, Retry-After, Spotify-App-Version, X-Cloud-Trace-Context, client-token, content-access-token",
    "access-control-allow-methods": "GET, POST, OPTIONS, PUT, DELETE, PATCH",
    "access-control-allow-credentials": "true",
    "access-control-max-age": "604800",
    "content-type": "application/json",
    "content-encoding": "gzip",
    "strict-transport-security": "max-age=31536000",
    "x-content-type-options": "nosniff",
    "date": "Thu, 21 Dec 2023 10:52:59 GMT",
    "server": "envoy",
    "via": "HTTP/2 edgeproxy, 1.1 google",
    "alt-svc": "h3=\":443\"; ma=2592000,h3-29=\":443\"; ma=2592000",
    "connection": "close",
    "transfer-encoding": "chunked"
  },
  "statusCode": 401
}
```

## 5. GET users/topArtists

Description:

- Get 10 most played artists from last 4 weeks

### Request

```json

type: string

The type of entity to return. Valid values: artists or tracks
values: "artists"

time_range: string
Over what time frame the affinities are computed. Valid values: long_term (calculated from several years of data and including all new data as it becomes available), medium_term (approximately last 6 months), short_term (approximately last 4 weeks). Default: medium_term
Default: time_range=medium_term
Example: time_range=medium_term

limit: integer
The maximum number of items to return. Default: 20. Minimum: 1. Maximum: 50.
Default: limit=20
Range: 0 - 50
Example: limit=10

offset: integer
The index of the first item to return. Default: 0 (the first item). Use with limit to get the next set of items.
Default: offset=0
Example: offset=5
```

Response (200 - OK)

```json
[
    {
        "album": {
            "album_type": "ALBUM",
            "artists": [
                {
                    "external_urls": {
                        "spotify": "https://open.spotify.com/artist/0zuIBB0gRxp4i4E2gvrcoM"
                    },
                    "href": "https://api.spotify.com/v1/artists/0zuIBB0gRxp4i4E2gvrcoM",
                    "id": "0zuIBB0gRxp4i4E2gvrcoM",
                    "name": "The Adams",
                    "type": "artist",
                    "uri": "spotify:artist:0zuIBB0gRxp4i4E2gvrcoM"
                }
            ],
            "available_markets": ["array of strings"],
            "external_urls": {
                "spotify": "https://open.spotify.com/album/6EjtRvsWa1wRYJgeJOROI3"
            },
            "href": "https://api.spotify.com/v1/albums/6EjtRvsWa1wRYJgeJOROI3",
            "id": "6EjtRvsWa1wRYJgeJOROI3",
            "images": [
                {
                    "height": 640,
                    "url": "https://i.scdn.co/image/ab67616d0000b273848d417028ad1eb2f8ff9c26",
                    "width": 640
                },
                {
                    "height": 300,
                    "url": "https://i.scdn.co/image/ab67616d00001e02848d417028ad1eb2f8ff9c26",
                    "width": 300
                },
                {
                    "height": 64,
                    "url": "https://i.scdn.co/image/ab67616d00004851848d417028ad1eb2f8ff9c26",
                    "width": 64
                }
            ],
            "name": "Agterplaas",
            "release_date": "2019-03-15",
            "release_date_precision": "day",
            "total_tracks": 11,
            "type": "album",
            "uri": "spotify:album:6EjtRvsWa1wRYJgeJOROI3"
        },
        "artists": [
            {
                "external_urls": {
                    "spotify": "https://open.spotify.com/artist/0zuIBB0gRxp4i4E2gvrcoM"
                },
                "href": "https://api.spotify.com/v1/artists/0zuIBB0gRxp4i4E2gvrcoM",
                "id": "0zuIBB0gRxp4i4E2gvrcoM",
                "name": "The Adams",
                "type": "artist",
                "uri": "spotify:artist:0zuIBB0gRxp4i4E2gvrcoM"
            }
        ],
        "available_markets": ["array of strings"],
        "disc_number": 1,
        "duration_ms": 299093,
        "explicit": false,
        "external_ids": {
            "isrc": "TCAEC1904822"
        },
        "external_urls": {
            "spotify": "https://open.spotify.com/track/2bEuh25NMtUEQGu6VqohPu"
        },
        "href": "https://api.spotify.com/v1/tracks/2bEuh25NMtUEQGu6VqohPu",
        "id": "2bEuh25NMtUEQGu6VqohPu",
        "is_local": false,
        "name": "Timur",
        "popularity": 62,
        "preview_url": "https://p.scdn.co/mp3-preview/c3bf2fd7a240abb5221f47cb5c795923dcc00f2b?cid=d86db55895ca45319957a258fac15a79",
        "track_number": 11,
        "type": "track",
        "uri": "spotify:track:2bEuh25NMtUEQGu6VqohPu"
    },
    ...,
]
```

Response (401 - Invalid Token)

```json
{
  "body": {
    "error": {
      "status": 401,
      "message": "The access token expired"
    }
  },
  "headers": {
    "www-authenticate": "Bearer realm=\"spotify\", error=\"invalid_token\", error_description=\"The access token expired\"",
    "access-control-allow-origin": "*",
    "access-control-allow-headers": "Accept, App-Platform, Authorization, Content-Type, Origin, Retry-After, Spotify-App-Version, X-Cloud-Trace-Context, client-token, content-access-token",
    "access-control-allow-methods": "GET, POST, OPTIONS, PUT, DELETE, PATCH",
    "access-control-allow-credentials": "true",
    "access-control-max-age": "604800",
    "content-type": "application/json",
    "content-encoding": "gzip",
    "strict-transport-security": "max-age=31536000",
    "x-content-type-options": "nosniff",
    "date": "Thu, 21 Dec 2023 10:52:59 GMT",
    "server": "envoy",
    "via": "HTTP/2 edgeproxy, 1.1 google",
    "alt-svc": "h3=\":443\"; ma=2592000,h3-29=\":443\"; ma=2592000",
    "connection": "close",
    "transfer-encoding": "chunked"
  },
  "statusCode": 401
}
```

## 6. GET users/reccommendByTracks

Description:

Get 10 songs reccomendations based on 5 most played songs from last 4 weeks.

Request

- headers:

```json
{
  "Authorization": "Bearer <string token>"
}
```

Response (200 - OK)

```json
[
    {
        "album": {
            "album_type": "ALBUM",
            "artists": [
                {
                    "external_urls": {
                        "spotify": "https://open.spotify.com/artist/0zuIBB0gRxp4i4E2gvrcoM"
                    },
                    "href": "https://api.spotify.com/v1/artists/0zuIBB0gRxp4i4E2gvrcoM",
                    "id": "0zuIBB0gRxp4i4E2gvrcoM",
                    "name": "The Adams",
                    "type": "artist",
                    "uri": "spotify:artist:0zuIBB0gRxp4i4E2gvrcoM"
                }
            ],
            "available_markets": ["array of strings"],
            "external_urls": {
                "spotify": "https://open.spotify.com/album/6EjtRvsWa1wRYJgeJOROI3"
            },
            "href": "https://api.spotify.com/v1/albums/6EjtRvsWa1wRYJgeJOROI3",
            "id": "6EjtRvsWa1wRYJgeJOROI3",
            "images": [
                {
                    "height": 640,
                    "url": "https://i.scdn.co/image/ab67616d0000b273848d417028ad1eb2f8ff9c26",
                    "width": 640
                },
                {
                    "height": 300,
                    "url": "https://i.scdn.co/image/ab67616d00001e02848d417028ad1eb2f8ff9c26",
                    "width": 300
                },
                {
                    "height": 64,
                    "url": "https://i.scdn.co/image/ab67616d00004851848d417028ad1eb2f8ff9c26",
                    "width": 64
                }
            ],
            "name": "Agterplaas",
            "release_date": "2019-03-15",
            "release_date_precision": "day",
            "total_tracks": 11,
            "type": "album",
            "uri": "spotify:album:6EjtRvsWa1wRYJgeJOROI3"
        },
        "artists": [
            {
                "external_urls": {
                    "spotify": "https://open.spotify.com/artist/0zuIBB0gRxp4i4E2gvrcoM"
                },
                "href": "https://api.spotify.com/v1/artists/0zuIBB0gRxp4i4E2gvrcoM",
                "id": "0zuIBB0gRxp4i4E2gvrcoM",
                "name": "The Adams",
                "type": "artist",
                "uri": "spotify:artist:0zuIBB0gRxp4i4E2gvrcoM"
            }
        ],
        "available_markets": ["array of strings"],
        "disc_number": 1,
        "duration_ms": 299093,
        "explicit": false,
        "external_ids": {
            "isrc": "TCAEC1904822"
        },
        "external_urls": {
            "spotify": "https://open.spotify.com/track/2bEuh25NMtUEQGu6VqohPu"
        },
        "href": "https://api.spotify.com/v1/tracks/2bEuh25NMtUEQGu6VqohPu",
        "id": "2bEuh25NMtUEQGu6VqohPu",
        "is_local": false,
        "name": "Timur",
        "popularity": 62,
        "preview_url": "https://p.scdn.co/mp3-preview/c3bf2fd7a240abb5221f47cb5c795923dcc00f2b?cid=d86db55895ca45319957a258fac15a79",
        "track_number": 11,
        "type": "track",
        "uri": "spotify:track:2bEuh25NMtUEQGu6VqohPu"
    },
    ...,
]
```

Response (401 - Invalid Token)

```json
{
  "body": {
    "error": {
      "status": 401,
      "message": "The access token expired"
    }
  },
  "headers": {
    "www-authenticate": "Bearer realm=\"spotify\", error=\"invalid_token\", error_description=\"The access token expired\"",
    "access-control-allow-origin": "*",
    "access-control-allow-headers": "Accept, App-Platform, Authorization, Content-Type, Origin, Retry-After, Spotify-App-Version, X-Cloud-Trace-Context, client-token, content-access-token",
    "access-control-allow-methods": "GET, POST, OPTIONS, PUT, DELETE, PATCH",
    "access-control-allow-credentials": "true",
    "access-control-max-age": "604800",
    "content-type": "application/json",
    "content-encoding": "gzip",
    "strict-transport-security": "max-age=31536000",
    "x-content-type-options": "nosniff",
    "date": "Thu, 21 Dec 2023 10:52:59 GMT",
    "server": "envoy",
    "via": "HTTP/2 edgeproxy, 1.1 google",
    "alt-svc": "h3=\":443\"; ma=2592000,h3-29=\":443\"; ma=2592000",
    "connection": "close",
    "transfer-encoding": "chunked"
  },
  "statusCode": 401
}
```

## 7. GET users/reccommendByArtists

Description:

Get 10 songs reccomendations based on 5 most played artists from last 4 weeks.

Request

- headers:

```json
{
  "Authorization": "Bearer <string token>"
}
```

Response (200 - OK)

```json
[
    {
        "album": {
            "album_type": "ALBUM",
            "artists": [
                {
                    "external_urls": {
                        "spotify": "https://open.spotify.com/artist/0zuIBB0gRxp4i4E2gvrcoM"
                    },
                    "href": "https://api.spotify.com/v1/artists/0zuIBB0gRxp4i4E2gvrcoM",
                    "id": "0zuIBB0gRxp4i4E2gvrcoM",
                    "name": "The Adams",
                    "type": "artist",
                    "uri": "spotify:artist:0zuIBB0gRxp4i4E2gvrcoM"
                }
            ],
            "available_markets": ["array of strings"],
            "external_urls": {
                "spotify": "https://open.spotify.com/album/6EjtRvsWa1wRYJgeJOROI3"
            },
            "href": "https://api.spotify.com/v1/albums/6EjtRvsWa1wRYJgeJOROI3",
            "id": "6EjtRvsWa1wRYJgeJOROI3",
            "images": [
                {
                    "height": 640,
                    "url": "https://i.scdn.co/image/ab67616d0000b273848d417028ad1eb2f8ff9c26",
                    "width": 640
                },
                {
                    "height": 300,
                    "url": "https://i.scdn.co/image/ab67616d00001e02848d417028ad1eb2f8ff9c26",
                    "width": 300
                },
                {
                    "height": 64,
                    "url": "https://i.scdn.co/image/ab67616d00004851848d417028ad1eb2f8ff9c26",
                    "width": 64
                }
            ],
            "name": "Agterplaas",
            "release_date": "2019-03-15",
            "release_date_precision": "day",
            "total_tracks": 11,
            "type": "album",
            "uri": "spotify:album:6EjtRvsWa1wRYJgeJOROI3"
        },
        "artists": [
            {
                "external_urls": {
                    "spotify": "https://open.spotify.com/artist/0zuIBB0gRxp4i4E2gvrcoM"
                },
                "href": "https://api.spotify.com/v1/artists/0zuIBB0gRxp4i4E2gvrcoM",
                "id": "0zuIBB0gRxp4i4E2gvrcoM",
                "name": "The Adams",
                "type": "artist",
                "uri": "spotify:artist:0zuIBB0gRxp4i4E2gvrcoM"
            }
        ],
        "available_markets": ["array of strings"],
        "disc_number": 1,
        "duration_ms": 299093,
        "explicit": false,
        "external_ids": {
            "isrc": "TCAEC1904822"
        },
        "external_urls": {
            "spotify": "https://open.spotify.com/track/2bEuh25NMtUEQGu6VqohPu"
        },
        "href": "https://api.spotify.com/v1/tracks/2bEuh25NMtUEQGu6VqohPu",
        "id": "2bEuh25NMtUEQGu6VqohPu",
        "is_local": false,
        "name": "Timur",
        "popularity": 62,
        "preview_url": "https://p.scdn.co/mp3-preview/c3bf2fd7a240abb5221f47cb5c795923dcc00f2b?cid=d86db55895ca45319957a258fac15a79",
        "track_number": 11,
        "type": "track",
        "uri": "spotify:track:2bEuh25NMtUEQGu6VqohPu"
    },
    ...,
]
```

Response (401 - Invalid Token)

```json
{
  "body": {
    "error": {
      "status": 401,
      "message": "The access token expired"
    }
  },
  "headers": {
    "www-authenticate": "Bearer realm=\"spotify\", error=\"invalid_token\", error_description=\"The access token expired\"",
    "access-control-allow-origin": "*",
    "access-control-allow-headers": "Accept, App-Platform, Authorization, Content-Type, Origin, Retry-After, Spotify-App-Version, X-Cloud-Trace-Context, client-token, content-access-token",
    "access-control-allow-methods": "GET, POST, OPTIONS, PUT, DELETE, PATCH",
    "access-control-allow-credentials": "true",
    "access-control-max-age": "604800",
    "content-type": "application/json",
    "content-encoding": "gzip",
    "strict-transport-security": "max-age=31536000",
    "x-content-type-options": "nosniff",
    "date": "Thu, 21 Dec 2023 10:52:59 GMT",
    "server": "envoy",
    "via": "HTTP/2 edgeproxy, 1.1 google",
    "alt-svc": "h3=\":443\"; ma=2592000,h3-29=\":443\"; ma=2592000",
    "connection": "close",
    "transfer-encoding": "chunked"
  },
  "statusCode": 401
}
```

## 8. POST users/addTracks

Description:

Generate a playlist that contain 10 songs that generated from 5 most played songs or artists from last 4 weeks

Request

- headers:

```json
{
  "Authorization": "Bearer <string token>"
}
```

Response (200 - OK)

```json
[
    {
        "album": {
            "album_type": "ALBUM",
            "artists": [
                {
                    "external_urls": {
                        "spotify": "https://open.spotify.com/artist/0zuIBB0gRxp4i4E2gvrcoM"
                    },
                    "href": "https://api.spotify.com/v1/artists/0zuIBB0gRxp4i4E2gvrcoM",
                    "id": "0zuIBB0gRxp4i4E2gvrcoM",
                    "name": "The Adams",
                    "type": "artist",
                    "uri": "spotify:artist:0zuIBB0gRxp4i4E2gvrcoM"
                }
            ],
            "available_markets": ["array of strings"],
            "external_urls": {
                "spotify": "https://open.spotify.com/album/6EjtRvsWa1wRYJgeJOROI3"
            },
            "href": "https://api.spotify.com/v1/albums/6EjtRvsWa1wRYJgeJOROI3",
            "id": "6EjtRvsWa1wRYJgeJOROI3",
            "images": [
                {
                    "height": 640,
                    "url": "https://i.scdn.co/image/ab67616d0000b273848d417028ad1eb2f8ff9c26",
                    "width": 640
                },
                {
                    "height": 300,
                    "url": "https://i.scdn.co/image/ab67616d00001e02848d417028ad1eb2f8ff9c26",
                    "width": 300
                },
                {
                    "height": 64,
                    "url": "https://i.scdn.co/image/ab67616d00004851848d417028ad1eb2f8ff9c26",
                    "width": 64
                }
            ],
            "name": "Agterplaas",
            "release_date": "2019-03-15",
            "release_date_precision": "day",
            "total_tracks": 11,
            "type": "album",
            "uri": "spotify:album:6EjtRvsWa1wRYJgeJOROI3"
        },
        "artists": [
            {
                "external_urls": {
                    "spotify": "https://open.spotify.com/artist/0zuIBB0gRxp4i4E2gvrcoM"
                },
                "href": "https://api.spotify.com/v1/artists/0zuIBB0gRxp4i4E2gvrcoM",
                "id": "0zuIBB0gRxp4i4E2gvrcoM",
                "name": "The Adams",
                "type": "artist",
                "uri": "spotify:artist:0zuIBB0gRxp4i4E2gvrcoM"
            }
        ],
        "available_markets": ["array of strings"],
        "disc_number": 1,
        "duration_ms": 299093,
        "explicit": false,
        "external_ids": {
            "isrc": "TCAEC1904822"
        },
        "external_urls": {
            "spotify": "https://open.spotify.com/track/2bEuh25NMtUEQGu6VqohPu"
        },
        "href": "https://api.spotify.com/v1/tracks/2bEuh25NMtUEQGu6VqohPu",
        "id": "2bEuh25NMtUEQGu6VqohPu",
        "is_local": false,
        "name": "Timur",
        "popularity": 62,
        "preview_url": "https://p.scdn.co/mp3-preview/c3bf2fd7a240abb5221f47cb5c795923dcc00f2b?cid=d86db55895ca45319957a258fac15a79",
        "track_number": 11,
        "type": "track",
        "uri": "spotify:track:2bEuh25NMtUEQGu6VqohPu"
    },
    ...,
]
```

Response (401 - Invalid Token)

```json
{
  "body": {
    "error": {
      "status": 401,
      "message": "The access token expired"
    }
  },
  "headers": {
    "www-authenticate": "Bearer realm=\"spotify\", error=\"invalid_token\", error_description=\"The access token expired\"",
    "access-control-allow-origin": "*",
    "access-control-allow-headers": "Accept, App-Platform, Authorization, Content-Type, Origin, Retry-After, Spotify-App-Version, X-Cloud-Trace-Context, client-token, content-access-token",
    "access-control-allow-methods": "GET, POST, OPTIONS, PUT, DELETE, PATCH",
    "access-control-allow-credentials": "true",
    "access-control-max-age": "604800",
    "content-type": "application/json",
    "content-encoding": "gzip",
    "strict-transport-security": "max-age=31536000",
    "x-content-type-options": "nosniff",
    "date": "Thu, 21 Dec 2023 10:52:59 GMT",
    "server": "envoy",
    "via": "HTTP/2 edgeproxy, 1.1 google",
    "alt-svc": "h3=\":443\"; ma=2592000,h3-29=\":443\"; ma=2592000",
    "connection": "close",
    "transfer-encoding": "chunked"
  },
  "statusCode": 401
}
```

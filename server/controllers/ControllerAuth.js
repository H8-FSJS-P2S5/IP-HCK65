const express = require('express');
const { User } = require('../models');
const SpotifyWebApi = require('spotify-web-api-node');
const querystring = require('querystring');
const { signToken } = require('../helpers/jwt');
const {OAuth2Client} = require('google-auth-library')
const client = new OAuth2Client()

class ControllerAuth {
    static async authTokenSpotify(req, res, next) {
        try {
            const { code } = req.body
            const clientId = process.env.SPOTIFY_CLIENT_ID
            const clientSecret = process.env.SPOTIFY_CLIENT_SECRET
            const redirectUri = 'http://localhost:5173/callback'

            const spotifyApi = new SpotifyWebApi({
                redirectUri,
                clientId,
                clientSecret
            })

            const data = await spotifyApi.authorizationCodeGrant(code);
            console.log(data);
            res.status(200).json({
                accessToken: data.body.access_token,
                refreshToken: data.body.refresh_token,
                expiresIn: data.body.expires_in
            })
            // res.send('spotify auth')
        } catch (error) {
            console.log(error);
        }
    }

    static async authCodeSpotify(req, res, next) {
        try {
            const clientId = process.env.SPOTIFY_CLIENT_ID
            const redirectUri = 'http://localhost:3000/auth/spotify/callback'
            const scopes = [
                'streaming',
                'user-read-private',
                'user-read-email',
                'user-read-recently-played',
                'user-read-playback-state',
                'user-modify-playback-state',
                'user-library-modify',
                'user-library-read',
                'user-follow-modify',
                'playlist-read-private',
                'playlist-modify-public',
                'playlist-modify-private',
                'user-top-read'
            ].join(',');
            // let scopes_encoded = scopes.replace(' ', '%20');
            // let state = generateRandomString(16);

            res.redirect('https://accounts.spotify.com/authorize?' +
                querystring.stringify({
                    client_id: clientId,
                    redirect_uri: redirectUri,
                    response_type: 'code',
                    scope: scopes,
                    show_dialog: 'true',
                }));

        } catch (error) {
            console.log(error, "<< catch error");
        }
    }

    static async authSpotifyCallback(req, res, next) {
        try {
            // console.log(req.query, "<<query");
            const { code } = req.query;
            const clientId = process.env.SPOTIFY_CLIENT_ID
            const clientSecret = process.env.SPOTIFY_CLIENT_SECRET
            const redirectUri = 'http://localhost:3000/auth/spotify/callback'

            const spotifyApi = new SpotifyWebApi({
                redirectUri,
                clientId,
                clientSecret
            })

            const data = await spotifyApi.authorizationCodeGrant(code);
            const access_token = data.body.access_token // ACCESS TOKEN
            console.log(data, "<------ data");
            spotifyApi.setAccessToken(access_token)
            const userData = await spotifyApi.getMe();
            console.log(userData.body, "<<< user data");
            // let password = toString(Math.random())
            // console.log(password);
            const profileData = await User.create({
                email: userData.body.email,
                name: userData.body.display_name,
                imageUrl: userData.body.images[1].url,
                profileUrl: userData.body.external_urls.spotify,
                access_token: data.body.access_token,
                refresh_token: data.body.refresh_token,
                password: 'password'
            })


            res.redirect(`http://localhost:5173/login?access_token=${access_token}&message=success&status=success`)
            
            res.status(201).json({
                profileData
            })
        } catch (error) {
            console.log(error);
        }
    }

    static async refreshToken(req, res, next) {
        try {
            const refresh_token = req.query.refresh_token
            const clientId = process.env.SPOTIFY_CLIENT_ID
            const clientSecret = process.env.SPOTIFY_CLIENT_SECRET
            const authOptions = {
                url: 'https://accounts.spotify.com/api/token',
                headers: {
                    'content-type': 'application/x-www-form-urlencoded',
                    'Authorization': 'Basic ' + (new Buffer.from(clientId + ':' + clientSecret).toString('base64'))
                },
                form: {
                    grant_type: 'refresh_token',
                    refresh_token: refresh_token
                },
                json: true
            }

            request.post(authOptions, function (error, response, body) {
                if (!error && response.statusCode === 200) {
                    var access_token = body.access_token,
                        refresh_token = body.refresh_token;
                    res.send({
                        'access_token': access_token,
                        'refresh_token': refresh_token
                    });
                }
            });

        } catch (error) {
            console.log(error);
        }
    }

    static async googleLogin(req, res, next) {
        try {
            const { google_token } = req.body
            const ticket = await client.verifyIdToken({
                idToken: google_token,
                audience: process.env.GOOGLE_CLIENT_ID
            });
            const payload = ticket.getPayload()

            const [user, created] = await User.findOrCreate({
                where: { email: payload.email },
                defaults: {
                    name: payload.name,
                    email: payload.email,
                    password: Math.random().toString()
                }
            })

            const access_token = signToken({ id: user.id })

            res.status(created ? 201 : 200).json({
                "message": `User ${user.email} found`,
                "access_token": access_token,
                "user": {
                    "name": user.name
                }
            })
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = ControllerAuth
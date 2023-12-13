const express = require('express');
const SpotifyWebApi = require('spotify-web-api-node');
const querystring = require('querystring');

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

    static async authSpotifyCallback (req, res, next) {
        try {
            // console.log(req.query, "<<query");
            const {code} = req.query;
            const clientId = process.env.SPOTIFY_CLIENT_ID
            const clientSecret = process.env.SPOTIFY_CLIENT_SECRET
            const redirectUri = 'http://localhost:3000/auth/spotify/callback'

            const spotifyApi = new SpotifyWebApi({
                redirectUri,
                clientId,
                clientSecret
            })

            const data = await spotifyApi.authorizationCodeGrant(code);
            console.log(data, "<------ data");
            res.redirect('http://localhost:5173/login?access_token=access_token&message=success&status=success')
            // res.status(200).json({
            //     accessToken: data.body.access_token,
            //     refreshToken: data.body.refresh_token,
            //     expiresIn: data.body.expires_in
            // })
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = ControllerAuth
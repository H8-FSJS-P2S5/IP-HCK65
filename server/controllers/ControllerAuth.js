const express = require('express');
const { User } = require('../models');
const SpotifyWebApi = require('spotify-web-api-node');
const querystring = require('querystring');
const { OAuth2Client } = require('google-auth-library')
const client = new OAuth2Client()

class ControllerAuth {

    static async authCodeSpotify(req, res, next) {
        try {
            const clientId = process.env.SPOTIFY_CLIENT_ID
            // const redirectUri = 'https://api.rafizuaf.online/auth/spotify/callback'
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

            res.redirect('https://accounts.spotify.com/authorize?' +
                querystring.stringify({
                    client_id: clientId,
                    redirect_uri: redirectUri,
                    response_type: 'code',
                    scope: scopes,
                    show_dialog: 'true',
                }));

        } catch (error) {
            // console.log(error, "<< catch error");
        }
    }

    static async authSpotifyCallback(req, res, next) {
        try {
            const { code } = req.query;
            const clientId = process.env.SPOTIFY_CLIENT_ID
            const clientSecret = process.env.SPOTIFY_CLIENT_SECRET
            // const redirectUri = 'https://api.rafizuaf.online/auth/spotify/callback'
            const redirectUri = 'http://localhost:3000/auth/spotify/callback'

            const spotifyApi = new SpotifyWebApi({
                redirectUri,
                clientId,
                clientSecret
            })

            const data = await spotifyApi.authorizationCodeGrant(code);
            const access_token = data.body.access_token // ACCESS TOKEN
            spotifyApi.setAccessToken(access_token)

            let profile = await spotifyApi.getMe()
            // console.log(profile.body, "<< profile");
            const [user, created] = await User.findOrCreate({
                where: { email: profile.body.email },
                defaults: {
                    email: profile.body.email,
                    name: profile.body.display_name,
                    imageUrl: profile.body.images[1].url,
                    profileUrl: profile.body.external_urls.spotify,
                    password: Math.random().toString(),
                }
            })

            res.redirect(`http://localhost:5173/login?access_token=${access_token}&message=success&status=success`)

        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = ControllerAuth
const express = require('express');
const SpotifyWebApi = require('spotify-web-api-node');

class ControllerUser {
    static async getInfoCurrentUser(req, res, next) {
        try {
            // console.log(req.headers.authorization, "<< headers");
            const clientId = process.env.SPOTIFY_CLIENT_ID
            const clientSecret = process.env.SPOTIFY_CLIENT_SECRET
            const redirectUri = 'http://localhost:3000/auth/spotify/callback'

            let spotifyApi = new SpotifyWebApi({
                redirectUri,
                clientId,
                clientSecret
            })

            spotifyApi.setAccessToken(req.headers.authorization)
            // console.log(spotifyApi, "<< spotifyApi");

            let data = await spotifyApi.getMe()
            // console.log(data.body, "<< data");

            res.json(data)
            // let data = await User.find
        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: 'Internal server error' 
            })
        }
    }

    static async getUserTopTracks(req, res, next) {
        try {
            const clientId = process.env.SPOTIFY_CLIENT_ID
            const clientSecret = process.env.SPOTIFY_CLIENT_SECRET
            const redirectUri = 'http://localhost:3000/auth/spotify/callback'

            let spotifyApi = new SpotifyWebApi({
                redirectUri,
                clientId,
                clientSecret
            })

            spotifyApi.setAccessToken(req.headers.authorization);

            let tracks = await spotifyApi.getMyTopTracks({ limit: 10, time_range: 'short_term' })

            res.json(tracks.body.items)

            // console.log(tracks);
        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: 'Internal server error' 
            })
        }
    }

    static async getUserTopArtists(req, res, next) {
        try {
            const clientId = process.env.SPOTIFY_CLIENT_ID
            const clientSecret = process.env.SPOTIFY_CLIENT_SECRET
            const redirectUri = 'http://localhost:3000/auth/spotify/callback'

            let spotifyApi = new SpotifyWebApi({
                redirectUri,
                clientId,
                clientSecret
            })

            spotifyApi.setAccessToken(req.headers.authorization);

            let tracks = await spotifyApi.getMyTopArtists({ limit: 10, time_range: 'short_term' })

            res.json(tracks.body.items)

            // console.log(tracks);
        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: 'Internal server error' 
            })
        }
    }

    static async getReccomendationByTracks(req, res, next) {
        try {
            const clientId = process.env.SPOTIFY_CLIENT_ID
            const clientSecret = process.env.SPOTIFY_CLIENT_SECRET
            const redirectUri = 'http://localhost:3000/auth/spotify/callback'
            let seed_tracks = []

            let spotifyApi = new SpotifyWebApi({
                redirectUri,
                clientId,
                clientSecret
            })

            spotifyApi.setAccessToken(req.headers.authorization);

            let tracks = await spotifyApi.getMyTopTracks({ limit: 5, time_range: 'short_term' })
            tracks = tracks.body.items
            // console.log(tracks), "<<<< tracks";
            tracks.map((track) => {
                // console.log(track.id);
                seed_tracks.push(track.id)
            })
            // console.log(seed_artists);
            let reccomendations = await spotifyApi.getRecommendations({
                limit: 10,
                market: 'US',
                seed_tracks
            })

            reccomendations = reccomendations.body.tracks

            res.json(reccomendations)

            // console.log(tracks);
        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: 'Internal server error' 
            })
        }
    }

    static async getReccomendationByArtists(req, res, next) {
        try {
            const clientId = process.env.SPOTIFY_CLIENT_ID
            const clientSecret = process.env.SPOTIFY_CLIENT_SECRET
            const redirectUri = 'http://localhost:3000/auth/spotify/callback'
            let seed_artists = []

            let spotifyApi = new SpotifyWebApi({
                redirectUri,
                clientId,
                clientSecret
            })

            spotifyApi.setAccessToken(req.headers.authorization);

            let artists = await spotifyApi.getMyTopArtists({ limit: 5, time_range: 'short_term' })
            artists = artists.body.items
            // console.log(tracks), "<<<< tracks";
            artists.map((artist) => {
                // console.log(track.id);
                seed_artists.push(artist.id)
            })
            // console.log(seed_artists);
            let reccomendations = await spotifyApi.getRecommendations({
                limit: 10,
                market: 'US',
                seed_artists
            })

            reccomendations = reccomendations.body.tracks

            res.json(reccomendations)

            // console.log(tracks);
        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: 'Internal server error' 
            })
        }
    }
}

module.exports = ControllerUser
const express = require('express');
const SpotifyWebApi = require('spotify-web-api-node');
const { User } = require('../models');

class ControllerUser {
    static async getInfoCurrentUser(req, res, next) {
        try {
            // console.log(req.headers.authorization, "<< headers");
            const clientId = process.env.SPOTIFY_CLIENT_ID
            const clientSecret = process.env.SPOTIFY_CLIENT_SECRET
            const redirectUri = 'http://localhost:3000/auth/spotify/callback'
            // const redirectUri = 'https://api.rafizuaf.online/auth/spotify/callback'

            let spotifyApi = new SpotifyWebApi({
                redirectUri,
                clientId,
                clientSecret
            })

            spotifyApi.setAccessToken(req.headers.authorization)
            // console.log(spotifyApi._credentials.accessToken, "<< spotifyApi");
            if(!spotifyApi._credentials.accessToken) {
                throw {
                    name: 'InvalidToken',
                    message: 'Invalid access token'
                }
            }

            let data = await spotifyApi.getMe()
            let profile = await User.findOne({ where: { email: data.body.email } })
            if (!profile) {
                throw {
                    name: "NotFound",
                    message: "User not found"
                }
            }

            res.status(200).json(profile)

        } catch (error) {
            console.log(error);
            if(error.name === 'InvalidToken') {
                return res.status(401).json({
                    error: error.message
                })
            }
            
            if(error.name === 'NotFound') {
                return res.status(404).json({
                    error: error.message
                })
            }

            res.status(500).json({
                message: 'Internal server error'
            })
        }
    }

    static async getUserTopTracks(req, res, next) {
        try {
            const clientId = process.env.SPOTIFY_CLIENT_ID
            const clientSecret = process.env.SPOTIFY_CLIENT_SECRET
            // const redirectUri = 'https://api.rafizuaf.online/auth/spotify/callback'
            const redirectUri = 'http://localhost:3000/auth/spotify/callback'

            let spotifyApi = new SpotifyWebApi({
                redirectUri,
                clientId,
                clientSecret
            })

            spotifyApi.setAccessToken(req.headers.authorization);
            // console.log(spotifyApi,"req tokennnn");

            let tracks = await spotifyApi.getMyTopTracks({ limit: 10, time_range: 'short_term' })
            let songs = tracks.body.items.map((song) => {
                return {
                    id: song.id,
                    songTitle: song.name,
                    artist: song.artists[0].name,
                    trackUrl: song.external_urls.spotify,
                    trackUri: song.uri,
                    albumImg: song.album.images[0].url,
                }
            })
            res.json(songs)
        
        } catch (error) {
            console.log(error, "error catch");
            if (error.name === "WebapiRegularError") {
                return res.status(401).json({
                    message: "Token invalid or expired"
                })
            }
            res.status(500).json({
                message: 'Internal server error'
            })
        }
    }

    static async getUserTopArtists(req, res, next) {
        try {
            const clientId = process.env.SPOTIFY_CLIENT_ID
            const clientSecret = process.env.SPOTIFY_CLIENT_SECRET
            // const redirectUri = 'https://api.rafizuaf.online/auth/spotify/callback'
            const redirectUri = 'http://localhost:3000/auth/spotify/callback'

            let spotifyApi = new SpotifyWebApi({
                redirectUri,
                clientId,
                clientSecret
            })

            spotifyApi.setAccessToken(req.headers.authorization);

            let tracks = await spotifyApi.getMyTopArtists({ limit: 10, time_range: 'short_term' })
            // console.log(tracks.body.items[0]);
            let artists = tracks.body.items.map((artist) => {
                return {
                    id: artist.id,
                    artist: artist.name,
                    artistUri: artist.uri,
                    artistUrl: artist.external_urls.spotify,
                    artistImg: artist.images[0].url,
                }
            })
            res.json(artists)

            // console.log(tracks);
        } catch (error) {
            console.log(error);
            if (error.name === "WebapiRegularError") {
                return res.status(401).json({
                    message: "Token invalid or expired"
                })
            }
            res.status(500).json({
                message: 'Internal server error'
            })
        }
    }

    static async getReccommendationByTracks(req, res, next) {
        try {
            const clientId = process.env.SPOTIFY_CLIENT_ID
            const clientSecret = process.env.SPOTIFY_CLIENT_SECRET
            // const redirectUri = 'https://api.rafizuaf.online/auth/spotify/callback'
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
            tracks.map((track) => {
                seed_tracks.push(track.id)
            })
            let recommendations = await spotifyApi.getRecommendations({
                limit: 10,
                market: 'US',
                seed_tracks
            })

            recommendations = recommendations.body.tracks
            let songs = recommendations.map((song) => {
                return {
                    id: song.id,
                    songTitle: song.name,
                    artist: song.artists[0].name,
                    trackUrl: song.external_urls.spotify,
                    trackUri: song.uri,
                    albumImg: song.album.images[0].url,
                }
            })

            res.json(songs)

        } catch (error) {
            console.log(error);
            if (error.name === "WebapiRegularError") {
                return res.status(401).json({
                    message: "Token invalid or expired"
                })
            }
            res.status(500).json({
                message: 'Internal server error'
            })
        }
    }

    static async getReccommendationByArtists(req, res, next) {
        try {
            const clientId = process.env.SPOTIFY_CLIENT_ID
            const clientSecret = process.env.SPOTIFY_CLIENT_SECRET
            // const redirectUri = 'https://api.rafizuaf.online/auth/spotify/callback'
            const redirectUri = 'http://localhost:3000/auth/spotify/callback'
            let seed_artists = []
            let track_uris = []

            let spotifyApi = new SpotifyWebApi({
                redirectUri,
                clientId,
                clientSecret
            })

            spotifyApi.setAccessToken(req.headers.authorization);
            let artists = await spotifyApi.getMyTopArtists({ limit: 5, time_range: 'short_term' })
            artists = artists.body.items
            artists.map((artist) => {
                seed_artists.push(artist.id)
            })

            let reccommendations = await spotifyApi.getRecommendations({
                limit: 10,
                market: 'US',
                seed_artists
            })

            reccommendations = reccommendations.body.tracks
            reccommendations.map((track) => {
                track_uris.push(track.uri)
            })

            let songs = reccommendations.map((song) => {
                return {
                    id: song.id,
                    songTitle: song.name,
                    artist: song.artists[0].name,
                    trackUrl: song.external_urls.spotify,
                    trackUri: song.uri,
                    albumImg: song.album.images[0].url,
                }
            })

            res.json(songs)

        } catch (error) {
            console.log(error);
            if (error.name === "WebapiRegularError") {
                return res.status(401).json({
                    message: "Token invalid or expired"
                })
            }
            res.status(500).json({
                message: 'Internal server error'
            })
        }
    }

    static async addTracksToPlaylist(req, res, next) {
        try {
            const track_uris = req.body
            if (track_uris) {
                const clientId = process.env.SPOTIFY_CLIENT_ID
                const clientSecret = process.env.SPOTIFY_CLIENT_SECRET
                // const redirectUri = 'https://api.rafizuaf.online/auth/spotify/callback'
                const redirectUri = 'http://localhost:3000/auth/spotify/callback'
                let spotifyApi = new SpotifyWebApi({
                    redirectUri,
                    clientId,
                    clientSecret
                })

                spotifyApi.setAccessToken(req.headers.authorization);

                let reccommendations = await spotifyApi.createPlaylist(
                    'Pitch+ Reccommendations', {
                    'description': 'Playlist generated based on top tracks/artists from Pitch+',
                    'public': true
                })
                let playlistId = reccommendations.body.id
                let addTracks = await spotifyApi.addTracksToPlaylist(playlistId, track_uris)
                // console.log(playlistId);
                // console.log(reccommendations);
                // console.log(addTracks);

                res.status(201).json({
                    message: 'Playlist added successfully'
                })
            } else {
                throw { name: "BadRequest", message: "No tracks provided" }

            }

        } catch (error) {
            if (error.name === "WebapiRegularError") {
                return res.status(401).json({
                    message: "Token invalid or expired"
                })
            }
            res.status(500).json({
                message: 'Internal server error'
            })
            console.log(error);
        }
    }
}

module.exports = ControllerUser
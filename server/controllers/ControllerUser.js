const express = require('express');
const SpotifyWebApi = require('spotify-web-api-node');
const { User } = require('../models');
const axios = require('axios');

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
                // console.log(spotifyApi, "<< spotifyApi");
                
                let data = await spotifyApi.getMe()
                let profile = await User.findOne({ where: { email: data.body.email }})
                if(!profile) {
                    throw {
                        name: "NotFound",
                        message: "User not found"
                    }
                }
            // let data = await spotifyApi.getMe()
            // console.log(data.body, "<< data");
            // const [user, created] = await User.findOrCreate({
            //     where: { email: data.body.email },
            //     defaults: {
            //         email: data.body.email,
            //         name: data.body.display_name,
            //         imageUrl: data.body.images[1].url,
            //         profileUrl: data.body.external_urls.spotify,
            //         password: Math.random().toString(),
            //     }
            // })

            // res.status(created ? 201 : 200).json( created ?{
            //     "message": `User ${user.email} found`
            // } : data)
            // let data = await User.find
            res.status(200).json(profile)


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
            // const redirectUri = 'https://api.rafizuaf.online/auth/spotify/callback'
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
            // console.log(tracks), "<<<< tracks";
            tracks.map((track) => {
                // console.log(track.id);
                seed_tracks.push(track.id)
            })
            // console.log(seed_artists);
            let reccommendations = await spotifyApi.getRecommendations({
                limit: 10,
                market: 'US',
                seed_tracks
            })

            reccommendations = reccommendations.body.tracks

            res.json(reccommendations)

            // console.log(tracks);
        } catch (error) {
            console.log(error);
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

            console.log('11111')
            let spotifyApi = new SpotifyWebApi({
                redirectUri,
                clientId,
                clientSecret
            })
            // console.log('22222')
            spotifyApi.setAccessToken(req.headers.authorization);
            // console.log('3333')
            let artists = await spotifyApi.getMyTopArtists({ limit: 5, time_range: 'short_term' })
            // console.log('444444')
            artists = artists.body.items
            // // console.log(tracks), "<<<< tracks";
            artists.map((artist) => {
                // console.log(track.id);
                seed_artists.push(artist.id)
            })
            console.log(seed_artists)
            // console.log(seed_artists);
            let reccommendations = await spotifyApi.getRecommendations({
                limit: 10,
                market: 'US',
                seed_artists
            })
            console.log('6666')
            reccommendations = reccommendations.body.tracks
            reccommendations.map((track) => {
                // console.log(track);
                track_uris.push(track.uri)
            })
            // console.log(track_uris);
            console.log('7777')
            res.json(reccommendations)

            // console.log(tracks);
        } catch (error) {
            console.log(error);
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

                res.json(addTracks)
            } else {
                throw { name: "BadRequest", message: "No tracks provided" }

            }

        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = ControllerUser
const express = require('express')
const ControllerUser = require('../controllers/ControllerUser')
const users = express.Router()

users.get('/my-profile', ControllerUser.getInfoCurrentUser)
users.get('/topTracks', ControllerUser.getUserTopTracks)
users.get('/topArtists', ControllerUser.getUserTopArtists)
users.get('/reccommendByTracks', ControllerUser.getReccommendationByTracks)
users.get('/reccommendByArtists', ControllerUser.getReccommendationByArtists)
users.post('/addTracks', ControllerUser.addTracksToPlaylist)

module.exports = users
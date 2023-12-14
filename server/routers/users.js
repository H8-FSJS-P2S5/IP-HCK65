const express = require('express')
const ControllerUser = require('../controllers/ControllerUser')
const users = express.Router()

users.get('/my-profile', ControllerUser.getInfoCurrentUser)
users.get('/topTracks', ControllerUser.getUserTopTracks)
users.get('/topArtists', ControllerUser.getUserTopArtists)
users.get('/reccomendByTracks', ControllerUser.getReccomendationByTracks)
users.get('/reccomendByArtists', ControllerUser.getReccomendationByArtists)

module.exports = users
const express = require('express')
const ControllerAuth = require('../controllers/ControllerAuth')
const auth = express.Router()

auth.post('/spotify/sign-in', ControllerAuth.authTokenSpotify)
auth.get('/spotify/sign-in', ControllerAuth.authCodeSpotify)
auth.get('/spotify/callback', ControllerAuth.authSpotifyCallback)
auth.get('/spotify/refresh-token', ControllerAuth.refreshToken)

module.exports = auth
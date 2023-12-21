const express = require('express')
const ControllerAuth = require('../controllers/ControllerAuth')
const auth = express.Router()

auth.get('/spotify/sign-in', ControllerAuth.authCodeSpotify)
auth.get('/spotify/callback', ControllerAuth.authSpotifyCallback)

module.exports = auth
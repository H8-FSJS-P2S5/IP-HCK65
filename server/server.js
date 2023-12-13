require('dotenv').config()
const express = require('express');
const cors = require('cors');
const SpotifyWebApi = require('spotify-web-api-node');

const app = express();
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/login', async (req, res) => {
    try {
        const code = req.body.code;
        const SPOTIFY_CLIENT_ID = process.env.SPOTIFY_CLIENT_ID
        const SPOTIFY_CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET
        // console.log(code, "<<<<<");
        const spotifyApi = new SpotifyWebApi({
            redirectUri: 'http://localhost:5173/callback',
            clientId: SPOTIFY_CLIENT_ID,
            clientSecret: SPOTIFY_CLIENT_SECRET
        });

        const data = await spotifyApi.authorizationCodeGrant(code);
        // console.log(data, "<-- data ");
        res.json({
            accessToken: data.body.access_token,
            refreshToken: data.body.refresh_token,
            expiresIn: data.body.expires_in
        });
    } catch (error) {
        console.error(error);
        res.status(400).json({
            message: 'Bad request',
        });
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

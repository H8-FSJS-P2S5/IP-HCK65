const express = require('express');
const SpotifyWebApi = require('spotify-web-api-node');
const cors = require('cors');

const app = express();
app.use(cors())
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

app.post('/login', async (req, res) => {
    try {
        const code = req.body.code;
        console.log(code, "<<<<<");
        const spotifyApi = new SpotifyWebApi({
            redirectUri: 'http://localhost:5173/callback',
            clientId: 'd86db55895ca45319957a258fac15a79',
            clientSecret: '61eb0859df554b0fa74994456208cbe5'
        });

        const data = await spotifyApi.authorizationCodeGrant(code);
        console.log(data, "<-- data ");
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

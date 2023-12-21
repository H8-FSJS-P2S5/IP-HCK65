const axios = require('axios');
const request = require('supertest');
const app = require('../app');
const { sequelize, User } = require('../models');
const {queryInterface} = sequelize
jest.mock('axios');

const fakeSpotifyToken = 'BQDtYI-LPXELzc-C-uUWG9pgabBuI7jOVRiF_VBBgz5-2NkDXL96Pp0-xf_9p0cq0exZq2td0Cu0dJNOgT0uCnp7iOvf8AP7W5aXsHz_AGOUdmuEbEcMqZNVc98J_U5IEOOzkdwSLG6YAWArwK3HL2b_-PY-pBegNYAS3v_KUhF1jlA7wHYlQdgdA6gxba1zJyMi6D6gkJPjZuMkWjffUiaXOGq6Cq8ZPAcKIoTZmr2cR7VlP7V55S5Tmqs_h4dtYz4L5Q-QAmGazXZYSGYPBP7NXGTrRWswtP7TcY4y5SveJQ';

describe('GET /users/my-profile', () => {
    test('should fetch top tracks from Spotify and return 200 status code', async () => {
        const response = await request(app)
            .get('/users/reccommendByArtists') 
            .set('Authorization', `${fakeSpotifyToken}`)
            .expect(200);
        expect(response.status).toBe(200);
    });

    test('no login/no authentication, should return Invalid token', async () => {
        const response = await request(app)
            .get('/users/reccommendByArtists')
            .expect(401);
        expect(response.status).toBe(401);
    });

});
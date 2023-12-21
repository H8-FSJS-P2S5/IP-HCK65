const axios = require('axios');
const request = require('supertest');
const app = require('../app');
const { sequelize, User } = require('../models');
const {queryInterface} = sequelize
jest.mock('axios');

const fakeSpotifyToken = 'BQDtS7uQ4_cwqdEZTOgUPtxA6-POlNv2Lkia7Wzmsvd2TW10Y1zYpL_1_WUyH2bBodOC3FsS3KyhQoJdWPZNXBgGp08_WhN-6QWapYaMQ_IVTWcQTuxK3qsDODvNbOVeZbhFEuxyzcRD__k3jy8hulX9ai6pZXkrYl4RQqopnTS1Xmwedm8sQhzLoqEJEze9hS0jNA_U6KsK7hishqntxO26oWCO_UYXhvT3iyrvl6iu27JT3Ecsbup2eowO3WP03vjNBrVURgKggzgSSafc1GAw5P8vPdBE3Yi4r9RwtuFhXg';

describe('GET /users/my-profile', () => {
    test('should fetch top tracks from Spotify and return 200 status code', async () => {
        const response = await request(app)
            .get('/users/reccommendByTracks') 
            .set('Authorization', `${fakeSpotifyToken}`)
            .expect(200);
        expect(response.status).toBe(200);
    });

    test('no login/no authentication, should return Invalid token', async () => {
        const response = await request(app)
            .get('/users/reccommendByTracks')
            .expect(401);
        expect(response.status).toBe(401);
    });

});
const axios = require('axios');
const request = require('supertest');
const app = require('../app');
const { sequelize, User } = require('../models');
const {queryInterface} = sequelize
jest.mock('axios');

// REAL TOKEN
const fakeSpotifyToken = 'BQDtS7uQ4_cwqdEZTOgUPtxA6-POlNv2Lkia7Wzmsvd2TW10Y1zYpL_1_WUyH2bBodOC3FsS3KyhQoJdWPZNXBgGp08_WhN-6QWapYaMQ_IVTWcQTuxK3qsDODvNbOVeZbhFEuxyzcRD__k3jy8hulX9ai6pZXkrYl4RQqopnTS1Xmwedm8sQhzLoqEJEze9hS0jNA_U6KsK7hishqntxO26oWCO_UYXhvT3iyrvl6iu27JT3Ecsbup2eowO3WP03vjNBrVURgKggzgSSafc1GAw5P8vPdBE3Yi4r9RwtuFhXg';

beforeAll(async () => {
    try {
        await queryInterface.bulkInsert('Users', [{
            email: "mukhtar.r.f@gmail.com",
            password: "0.15877415510662152",
            name: "api",
            imageUrl: "https://i.scdn.co/image/ab6775700000ee85bd4bea126bfc71c211fd3aab",
            profileUrl: "https://open.spotify.com/user/rafizuaf",
            createdAt: new Date(),
            updatedAt: new Date()
        }], {});
    } catch (error) {
        console.log(error);
    }
});

describe.skip('GET /users/my-profile', () => {
    test('should fetch current user info from Spotify and return 200 status code', async () => {
        const response = await request(app)
            .get('/users/my-profile') 
            .set('Authorization', `${fakeSpotifyToken}`)
            .expect(200);
        expect(response.status).toBe(200);
    });

    test('no login/no authentication, should return Invalid token', async () => {
        const response = await request(app)
            .get('/users/my-profile')
            .expect(401);
        expect(response.status).toBe(401);
    });

    // test('no user found, should return user not found', async () => {
    //     const response = await request(app)
    //     .get('/users/my-profile') 
    //     .set('Authorization', `${fakeSpotifyToken}`)
    //     .expect(200);
    // expect(response.status).toBe(200);
    // });
});

afterAll(async () => {
    await queryInterface.bulkDelete("Users", null, {
        truncate: true,
        cascade: true,
        restartIdentity: true
    })
})
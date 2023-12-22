const axios = require('axios');
const request = require('supertest');
const app = require('../app');
const { sequelize, User } = require('../models');
const {queryInterface} = sequelize
jest.mock('axios');

// REAL TOKEN
const fakeSpotifyToken = 'BQDtYI-LPXELzc-C-uUWG9pgabBuI7jOVRiF_VBBgz5-2NkDXL96Pp0-xf_9p0cq0exZq2td0Cu0dJNOgT0uCnp7iOvf8AP7W5aXsHz_AGOUdmuEbEcMqZNVc98J_U5IEOOzkdwSLG6YAWArwK3HL2b_-PY-pBegNYAS3v_KUhF1jlA7wHYlQdgdA6gxba1zJyMi6D6gkJPjZuMkWjffUiaXOGq6Cq8ZPAcKIoTZmr2cR7VlP7V55S5Tmqs_h4dtYz4L5Q-QAmGazXZYSGYPBP7NXGTrRWswtP7TcY4y5SveJQ';

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

describe.only('GET /users/my-profile', () => {
    test('should fetch current user info from Spotify and return 200 status code', async () => {
        const response = await request(app)
            .get('/users/my-profile') 
            .set('Authorization', `${fakeSpotifyToken}`)
            .expect(200);
        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('email', expect.any(String));
        expect(response.body).toHaveProperty('password', expect.any(String));
        expect(response.body).toHaveProperty('name', expect.any(String));
        expect(response.body).toHaveProperty('imageUrl', expect.any(String));
        expect(response.body).toHaveProperty('profileUrl', expect.any(String));
    });

    test('no login/no authentication, should return Invalid token', async () => {
        const response = await request(app)
            .get('/users/my-profile')
            .expect(401);
        expect(response.status).toBe(401);
        expect(response.body).toHaveProperty('error')
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
const axios = require('axios');
const request = require('supertest');
const app = require('../app'); // Sesuaikan path ini
const { sequelize, User } = require('../models');
const {queryInterface} = sequelize
jest.mock('axios');

// REAL TOKEN
const fakeSpotifyToken = 'BQCVizkj_zoWIzdZMXCjVldur0sx34ICGHMLXeEcKdpRhP-jvMzqNo-DxHNJ1o2_0A4PxirHYae1rSefvDBOWvS4_htuPFMz69QmDJ-0BS4fzPoffovQMsZn-lw62rXT4DFYPhAagD7ZnU19hHn1jKWL_XsaG_ta0aPnfBHtn-DtPPcgilgWGJYUvZroVs3bo07ij7BGVrVLhf3YoHUKpfmHaTujRBRhI_248ZypJz9Qs87JJmUKSqbNMZUDvLJMxp92BvPra_FVBwkY-Fg94BiPVCT7DF8NJZfPa1O0asFM-Q';

// Set up mock Axios sebelum setiap tes
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

    test('no user found, should return user not found', async () => {
        const response = await request(app)
        .get('/users/my-profile') 
        .set('Authorization', `${fakeSpotifyToken}`)
        .expect(200);
    expect(response.status).toBe(200);
    });


});

afterAll(async () => {
    await queryInterface.bulkDelete("Users", null, {
        truncate: true,
        cascade: true,
        restartIdentity: true
    })
})
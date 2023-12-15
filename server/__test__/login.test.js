const request = require("supertest")
const fs = require("fs").promises
const app = require("../app")

const {sequelize} = require("../models")
const {generatePassword} = require("../helpers");
const {queryInterface} = sequelize

const user = {
    email: "gemaadmin@gmail.com",
    password: "12345678"
}

beforeAll(async () => {
    try {
        let users = JSON.parse(await fs.readFile('./data/users.json', 'utf-8')).map(item => {
            item.password = generatePassword(item.password);
            item.createdAt = new Date();
            item.updatedAt = new Date();
            return item;
        });

        await queryInterface.bulkInsert('Users', users);
    } catch (error) {
        console.log(error)
    }
})

afterAll(async () => {
    try {
        await queryInterface.bulkDelete('Users', null, {
            truncate: true,
            cascade: true,
            restartIdentity: true,
        });
    } catch (error) {
        console.log(error)
    }
})

describe('POST /login', () => {
    describe('success condition', () => {
        describe('login with Admin', () => {
            test('show access token', async () => {
                let {status, body} = await request(app).post("/login").send(user);

                expect(status).toBe(200);
                expect(body).toHaveProperty("access_token", expect.any(String));
            });
        });
    });

    describe('failed condition', () => {
        describe('login with Admin', () => {
            test('show error null email validation', async () => {
                let {status, body} = await request(app).post("/login").send({password: user.password});

                expect(status).toBe(400);
                expect(body.message).toEqual(["Email is required"]);
            });

            test('show error null password validation', async () => {
                let {status, body} = await request(app).post("/login").send({email: user.email});

                expect(status).toBe(400);
                expect(body.message).toEqual(["Password is required"]);
            });

            test('show error email is not valid', async () => {
                let {status, body} = await request(app).post("/login").send({
                    email: "emailsalah@gmail.com",
                    password: user.password
                });

                expect(status).toBe(401);
                expect(body.message).toEqual("Invalid email/password");
            });

            test('show error password is not valid', async () => {
                let {status, body} = await request(app).post("/login").send({
                    email: user.email,
                    password: "123456789"
                });

                expect(status).toBe(401);
                expect(body.message).toEqual("Invalid email/password");
            });
        });
    });
});

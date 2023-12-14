const request = require("supertest")
const fs = require("fs").promises
const app = require("../app")
const {sequelize, Campaign} = require("../models")
const {generatePassword, signToken} = require("../helpers");
const {queryInterface} = sequelize


let ROUTE = "/campaigns/1/transaction"
let TOKEN_ADMIN
let CAMPAIGN

beforeAll(async () => {
    try {
        let users = JSON.parse(await fs.readFile('./data/users.json', 'utf-8')).map(item => {
            item.password = generatePassword(item.password);
            item.createdAt = new Date();
            item.updatedAt = new Date();
            return item;
        });

        await queryInterface.bulkInsert('Users', users);
        TOKEN_ADMIN = signToken({id: 1, role: "Admin"})


        CAMPAIGN = await Campaign.create({
            title: "title campaign",
            description: "description",
            total_fundraising: 5000,
            remaining_balance: 5000,
            image_1: "https://placekitten.com/200/300",
            image_2: "https://placekitten.com/200/300",
            image_3: "https://placekitten.com/200/300"
        })
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

        await queryInterface.bulkDelete('Campaigns', null, {
            truncate: true,
            cascade: true,
            restartIdentity: true,
        });
    } catch (error) {
        console.log(error)
    }
})


describe('GET /campaigns', () => {
    describe('success condition', () => {
        describe('login with Admin', () => {
            test('success read all campaigns', async () => {
                let {status, body} = await request(app)
                    .post(ROUTE)
                    .send({total:5})
                    .set("Authorization", `Bearer ${TOKEN_ADMIN}`);


                expect(status).toBe(500);

            });

            test('success read all campaigns', async () => {
                let {status, body} = await request(app)
                    .post('/invoice')
                    .send({amount:5})
                    .set("Authorization", `Bearer ${TOKEN_ADMIN}`);


                expect(status).toBe(200);
                expect(body.externalId).toBe("1");
                expect(body.description).toBe("Invoice Deposit Saldo");
            });

            test('success read all campaigns', async () => {
                let {status, body} = await request(app)
                    .get('/user-information')
                    .set("Authorization", `Bearer ${TOKEN_ADMIN}`);


                expect(status).toBe(200);
                expect(body.data.role).toBe("admin");
                expect(body.data.email).toBe("gemaadmin@gmail.com");
            });
        });
    });

    describe('failed condition', () => {
        describe('login with Admin', () => {
            test("show error null token doesn't exists", async () => {
                let {status, body} = await request(app)
                    .get(ROUTE)

                expect(status).toBe(401);
                expect(body.message).toEqual("Invalid Token");
            });

        });
    });
});

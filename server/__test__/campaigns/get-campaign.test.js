const request = require("supertest")
const fs = require("fs").promises
const app = require("../../app")
const {sequelize, Campaign} = require("../../models")
const {generatePassword, signToken} = require("../../helpers");
const {queryInterface} = sequelize


let ROUTE = "/campaigns"
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
                let {title, description, total_fundraising, remaining_balance, image_1, image_2, image_3} = CAMPAIGN
                let {status, body} = await request(app)
                    .get(ROUTE)
                    .set("Authorization", `Bearer ${TOKEN_ADMIN}`);

                expect(status).toBe(200);

                expect(body.data[0].title).toBe(title);
                expect(body.data[0].description).toBe(description);
                expect(body.data[0].total_fundraising).toBe(total_fundraising);
                expect(body.data[0].remaining_balance).toBe(remaining_balance);
                expect(body.data[0].image_1).toBe(image_1);
                expect(body.data[0].image_2).toBe(image_2);
                expect(body.data[0].image_3).toBe(image_3);
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

            test("show error invalid token doesn't exists", async () => {
                let {status, body} = await request(app)
                    .get(ROUTE)
                    .set("Authorization", `Bearer token`)

                expect(status).toBe(401);
                expect(body.message).toEqual("Unauthorized");
            });
        });
    });
});

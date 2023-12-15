const request = require("supertest")
const fs = require("fs").promises
const app = require("../../app")
const {sequelize, Campaign, User} = require("../../models")
const {generatePassword, signToken} = require("../../helpers");
const {queryInterface} = sequelize


let ROUTE = "/campaigns"
let TOKEN_ADMIN
let TOKEN_STAFF
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

        await User.create({
            "username": "gemastaff",
            "email": "gemastaff@gmail.com",
            "password": "12345678",
            "role": "Staff",
            "phoneNumber": "08962327391",
            "address": "Jakarta Barat"
        })
        TOKEN_STAFF = signToken({id: 3, role: "Staff"})

    } catch (error) {
        console.log(error)
    }
})

beforeEach(async () => {
    CAMPAIGN = await Campaign.create({
        title: "title campaign",
        description: "description",
        total_fundraising: 5000,
        remaining_balance: 5000,
        image_1: "https://placekitten.com/200/300",
        image_2: "https://placekitten.com/200/300",
        image_3: "https://placekitten.com/200/300"
    })
});


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


describe('DELETE /campaigns', () => {
    describe('success condition', () => {
        describe('login with Admin', () => {
            test('success delete campaign', async () => {
                let {id, title, description, total_fundraising, remaining_balance, image_1, image_2, image_3} = CAMPAIGN
                let {status, body} = await request(app)
                    .delete(`${ROUTE}/${id}`)
                    .set("Authorization", `Bearer ${TOKEN_ADMIN}`);

                expect(status).toBe(200);
                expect(body.message).toBe(`${title} success to delete`);
            });
        });
    });

    describe('failed condition', () => {
        describe('login with Admin', () => {
            test("show error null token doesn't exists", async () => {
                let {id} = CAMPAIGN
                let {status, body} = await request(app)
                    .delete(`${ROUTE}/${id}`)

                console.log(body)
                expect(status).toBe(401);
                expect(body.message).toEqual("Invalid Token");
            });

            test("show error invalid token doesn't exists", async () => {
                let {id} = CAMPAIGN
                let {status, body} = await request(app)
                    .delete(`${ROUTE}/${id}`)
                    .set("Authorization", `Bearer token`)

                expect(status).toBe(401);
                expect(body.message).toEqual("Unauthorized");
            });

            test("show error invalid id campaign", async () => {
                let {id} = CAMPAIGN
                let {status, body} = await request(app)
                    .delete(`${ROUTE}/777777`)
                    .set("Authorization", `Bearer ${TOKEN_ADMIN}`)

                expect(status).toBe(404);
                expect(body.message).toBe("error not found");
            });
        });

        describe('login with Staff', () => {
            test('show error invalid access', async () => {
                let {id} = CAMPAIGN
                title = "new title campaign"
                let {status, body} = await request(app)
                    .delete(`${ROUTE}/${id}`)
                    .set("Authorization", `Bearer ${TOKEN_STAFF}`);

                expect(status).toBe(401);
                expect(body.message).toBe("Unauthorized");
            });
        });
    });
});

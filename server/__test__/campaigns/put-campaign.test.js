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

        TOKEN_ADMIN = signToken({id: 1, role: "admin"})

        let user = await User.create({
            "fullName": "Gema Stafff",
            "username": "gemastafff",
            "email": "gemastafff@gmail.com",
            "password": "12345678",
            "role": "staff",
        })
        TOKEN_STAFF = signToken({id: user.id, role: "staff"})

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


describe('PUT /campaigns', () => {
    describe('success condition', () => {
        describe('login with Admin', () => {
            test('success put campaign', async () => {

                let {id, title, description, total_fundraising, remaining_balance, image_1, image_2, image_3} = CAMPAIGN
                title = "new title article"
                let {status, body} = await request(app)
                    .put(`${ROUTE}/${id}`)
                    .send({title, description, total_fundraising, remaining_balance, image_1, image_2, image_3})
                    .set("Authorization", `Bearer ${TOKEN_ADMIN}`);

                expect(status).toBe(200);
                expect(body.title).toBe(title);
                expect(body.description).toBe(description);
                expect(body.total_fundraising).toBe(total_fundraising);
                expect(body.remaining_balance).toBe(remaining_balance);
                expect(body.image_1).toBe(image_1);
                expect(body.image_2).toBe(image_2);
                expect(body.image_3).toBe(image_3);
            });
        });
    });

    describe('failed condition', () => {
        describe('login with Admin', () => {
            test("show error null token doesn't exists", async () => {
                let {id, title, description, total_fundraising, remaining_balance, image_1, image_2, image_3} = CAMPAIGN
                let {status, body} = await request(app)
                    .put(`${ROUTE}/${id}`)
                    .send({title, description, total_fundraising, remaining_balance, image_1, image_2, image_3});

                expect(status).toBe(401);
                expect(body.message).toEqual("Invalid Token");
            });

            test("show error invalid token doesn't exists", async () => {
                let {id, title, description, total_fundraising, remaining_balance, image_1, image_2, image_3} = CAMPAIGN
                let {status, body} = await request(app)
                    .put(`${ROUTE}/${id}`)
                    .send({title, description, total_fundraising, remaining_balance, image_1, image_2, image_3})
                    .set("Authorization", `Bearer token`)

                expect(status).toBe(401);
                expect(body.message).toEqual("Unauthorized");
            });

            test("show error invalid id article", async () => {
                let {title, description, total_fundraising, remaining_balance, image_1, image_2, image_3} = CAMPAIGN
                let {status, body} = await request(app)
                    .put(`${ROUTE}/777777`)
                    .send({title, description, total_fundraising, remaining_balance, image_1, image_2, image_3})
                    .set("Authorization", `Bearer ${TOKEN_ADMIN}`)


                expect(status).toBe(404);
                expect(body.message).toBe("error not found");
            });

            test("show error validation title & content", async () => {
                let {id, title, description, total_fundraising, remaining_balance, image_1, image_2, image_3} = CAMPAIGN
                let {status, body} = await request(app)
                    .put(`${ROUTE}/${id}`)
                    .send({total_fundraising, remaining_balance, image_1, image_2, image_3})
                    .set("Authorization", `Bearer ${TOKEN_ADMIN}`)

                expect(status).toBe(400);
                expect(body.message).toEqual(['Please enter your title', 'Please enter your description']);
            });

        });

        describe('login with Staff', () => {
            test('show error invalid access', async () => {
                let {id, title, description, total_fundraising, remaining_balance, image_1, image_2, image_3} = CAMPAIGN
                title = "new title campaign"
                let {status, body} = await request(app)
                    .put(`${ROUTE}/${id}`)
                    .send({title, description, total_fundraising, remaining_balance, image_1, image_2, image_3})
                    .set("Authorization", `Bearer ${TOKEN_STAFF}`);


                expect(status).toBe(200);
                expect(body.message).toBe(undefined);
            });
        });
    });
});

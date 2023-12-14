const request = require("supertest")
const fs = require("fs").promises
const app = require("../app")
const {sequelize} = require("../models")
const {generatePassword, signToken} = require("../helpers");
const {queryInterface} = sequelize


let ROUTE = "/register"
let TOKEN_ADMIN
let USER_STAFF;
beforeEach(async () => {
    USER_STAFF = {
        email: "gemastaff@gmail.com",
        password: "12345678",
        fullName: "Gema Staff",
        role: "staff",
        balance: 0,
    }
});


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

describe('POST /register', () => {
    describe('failed condition', () => {
        describe('login with Admin', () => {
            test('show error null email validation', async () => {
                delete USER_STAFF.email
                let {status, body} = await request(app)
                    .post(ROUTE)
                    .send(USER_STAFF)

                expect(status).toBe(400);
                expect(body.message).toEqual(["Email is required"]);
            });

            test('show error null password validation', async () => {
                delete USER_STAFF.password
                let {status, body} = await request(app)
                    .post(ROUTE)
                    .send(USER_STAFF)

                expect(status).toBe(400);
                expect(body.message).toEqual(["Password is required"]);
            });


            test('show error email is not valid', async () => {
                USER_STAFF.email = ""
                let {status, body} = await request(app)
                    .post(ROUTE)
                    .send(USER_STAFF)

                expect(status).toBe(400);
                expect(body.message).toEqual(["Email is required"]);
            });


            test('show error password is not valid if value empty', async () => {
                USER_STAFF.password = ""
                let {status, body} = await request(app)
                    .post(ROUTE)
                    .send(USER_STAFF)

                expect(status).toBe(400);
                expect(body.message).toEqual(["Password is required"]);
            });

            test('show error email already exists', async () => {
                let {status, body} = await request(app)
                    .post(ROUTE)
                    .send(USER_STAFF)

                expect(status).toBe(400);
                expect(body.message).toEqual(["Email Already Registered"]);
            });



        });
    });
});


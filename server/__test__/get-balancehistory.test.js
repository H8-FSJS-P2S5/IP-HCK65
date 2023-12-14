const request = require("supertest")
const fs = require("fs").promises
const app = require("../app")
const {sequelize, BalanceHistory} = require("../models")
const {generatePassword, signToken} = require("../helpers");
const {queryInterface} = sequelize


let ROUTE = "/balance-histories"
let TOKEN_ADMIN
let BALANCEHISTORY

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


        BALANCEHISTORY = await BalanceHistory.create({
            transaction_type: 2,
            total: 5000,
            user_id: 1,
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

        await queryInterface.bulkDelete('BalanceHistories', null, {
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
            test('success read balance histories', async () => {
                let {id, transaction_type, total, user_id} = BALANCEHISTORY
                let {status, body} = await request(app)
                    .get(ROUTE)
                    .set("Authorization", `Bearer ${TOKEN_ADMIN}`);

                expect(status).toBe(200);

                expect(body.data[0].id).toBe(id);
                expect(body.data[0].transaction_type).toBe(transaction_type);
                expect(body.data[0].total).toBe(total);
                expect(body.data[0].user_id).toBe(user_id);
            });
        });
    });
});

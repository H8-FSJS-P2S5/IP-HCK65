const request = require("supertest");
const app = require("../app");
const { sequelize } = require("../models");
const { User } = require("../models");
const { signToken } = require("../helper/jwt");
const { hashPw, comparePwDecrypted } = require("../helper/bcrypt");
const { queryInterface } = sequelize;
const fs = require("fs/promises");

beforeAll(async () => {
  try {
    let dataUser = await fs.readFile("./data/users.json", "utf-8");
    let parseData = JSON.parse(dataUser);
    parseData = await parseData.map((el) => {
      delete el.id;
      el.createdAt = el.updatedAt = new Date();
      el.password = hashPw(el.password);
      return el;
    });
    await queryInterface.bulkInsert("Users", parseData, {});
  } catch (error) {
    // console.log(error, "INI ERROR BEFORE ALL <<<");
  }
});

describe("POST /login", () => {
  test("should create an access_token", async () => {
    const userAdm = {
      inputCreds: "nellfoster@dymi.com",
      password: "12345",
    };
    let response = await request(app).post("/login").send(userAdm);
    // console.log(response.body, "INI RESPONSE <<<<<<");
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("access_token", expect.any(String));
  });

  test("should return an error on missing inputCreds", async () => {
    const userAdm = {
      inputCreds: "",
      password: "12345",
    };
    let response = await request(app).post("/login").send(userAdm);
    // console.log(response.body, "INI RESPONSE <<<<<<");
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty(
      "message",
      "username / email / password is required"
    );
  });

  test("should return an error on missing password", async () => {
    const userAdm = {
      inputCreds: "nellfoster@dymi.com",
      password: "",
    };
    let response = await request(app).post("/login").send(userAdm);
    // console.log(response.body, "INI RESPONSE <<<<<<");
    expect(response.status).toBe(500);
    expect(response.body).toHaveProperty(
      "message",
      "username / email / password is required"
    );
  });

  test("should return an error on wrong input creds", async () => {
    const userAdm = {
      inputCreds: "dddddddddddddddd@dymi.com",
      password: "12345",
    };
    let response = await request(app).post("/login").send(userAdm);
    // console.log(response.body, "INI RESPONSE <<<<<<");
    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty(
      "message",
      "wrong email/ username/ password"
    );
  });

  test("should return an error on wrong password", async () => {
    const userAdm = {
      inputCreds: "Nell",
      password: "123222222245",
    };
    let response = await request(app).post("/login").send(userAdm);
    // console.log(response.body, "INI RESPONSE <<<<<<");
    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty(
      "message",
      "wrong email/ username/ password"
    );
  });
});

afterAll(async () => {
  await queryInterface.bulkDelete("Users", null, {
    truncate: true,
    cascade: true,
    restartIdentity: true,
  });
});

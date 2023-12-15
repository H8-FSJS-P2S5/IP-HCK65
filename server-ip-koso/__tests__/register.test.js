// const request = require("supertest");
// const app = require("../app");
// const { sequelize } = require("../models");
// const { User } = require("../models");
// const { queryInterface } = sequelize;
// const fs = require("fs/promises");
// const path = require("path");
// const { signToken } = require("../helper/jwt");
// const { hashPw, comparePwDecrypted } = require("../helper/bcrypt");

// let token_admin;
// let token_staff;

// beforeAll(async () => {
//   try {
//     //Adding admin and 1 user to db
//     const userJson = path.join(__dirname, "..", "data", "users.json");
//     // console.log(userJson, "PATH BEFOREALL");
//     let dataUser = await fs.readFile(userJson, "utf-8");
//     // console.log(dataUser, "DATAUSER BEFOREALL");
//     let parseData = JSON.parse(dataUser);
//     parseData = await parseData.map((el) => {
//       delete el.id;
//       el.createdAt = el.updatedAt = new Date();
//       el.password = hashPw(el.password);
//       return el;
//     });
//     await queryInterface.bulkInsert("Users", parseData, {});
//     //finding user
//     const userAdm = await User.findByPk(1);
//     const userSt = await User.findByPk(2);
//     //Logging in the user

//     token_admin = signToken({ id: userAdm.id });
//     token_staff = signToken({ id: userSt.id });

//     console.log(token_admin)

//   } catch (error) {
//   }
// });

// describe("POST /register", () => {
//   test("should return new user data", async () => {
//     const newUser = {
//       username: "ShinDoL",
//       email: "shindol@123mail.com",
//       password: "12345",
      
//     };
//     let response = await request(app)
//       .post("/register")
//       .set("Authorization", `Bearer ${token_admin}`)
//       .send(newUser);
//     // console.log(response.body, "INI RESPONSE <<<<<<");
//     expect(response.status).toBe(201);
//     expect(response.body).toHaveProperty("id", expect.any(Number));
//     expect(response.body).toHaveProperty("username", newUser.username);
//     expect(response.body).toHaveProperty("email", newUser.email);
//     expect(response.body).not.toHaveProperty("password", expect.any(String));
//   });

//   test("should return error when email field is missing", async () => {
//     const newUser = {
//       username: "ShinDoL",
//       password: "12345",
//     };
//     let response = await request(app)
//       .post("/register")
//       .set("Authorization", `Bearer ${token_admin}`)
//       .send(newUser);
//     // console.log(response.body, "INI RESPONSE <<<<<<");
//     expect(response.status).toBe(400);
//     expect(response.body).toHaveProperty("message", "email is required");
//   });

//   test("should return error when email is an empty string", async () => {
//     const newUser = {
//       username: "ShinDoL",
//       email: "",
//       password: "12345",
//     };
//     let response = await request(app)
//       .post("/register")
//       .set("Authorization", `Bearer ${token_admin}`)
//       .send(newUser);
//     // console.log(response.body, "INI RESPONSE <<<<<<");
//     expect(response.status).toBe(400);
//     expect(response.body).toHaveProperty("message", [
//       "email is required",
//       "email must be an email format",
//     ]);
//   });

//   test("should return error when password field is missing or an empty string", async () => {
//     const newUser = {
//       username: "ShinDoL",
//       email: "shindol@123mail.com",
//     };
//     let response = await request(app)
//       .post("/register")
//       .set("Authorization", `Bearer ${token_admin}`)
//       .send(newUser);
//     // console.log(response.body, "INI RESPONSE <<<<<<");
//     expect(response.status).toBe(400);
//     expect(response.body).toHaveProperty("message", "password is required");
//   });

//   test("should return error when email is detected as a duplicate", async () => {
//     const newUser = {
//       username: "ShinDoL",
//       email: "nellfoster@dymi.com",
//       password: "12345",
//     };
//     let response = await request(app)
//       .post("/register")
//       .set("Authorization", `Bearer ${token_admin}`)
//       .send(newUser);
//     // console.log(response.body, "INI RESPONSE <<<<<<");
//     expect(response.status).toBe(400);
//     expect(response.body).toHaveProperty("message", "email must be unique");
//   });

//   test("should return error when email is not an email format", async () => {
//     const newUser = {
//       username: "ShinDoL",
//       email: "shindol123mail.com",
//       password: "12345",
//       phoneNumber: "+62 (666) 666-6666",
//       address: "Kyoto, Jagamaru 3 Chome, Apt 2 R 3",
//     };
//     let response = await request(app)
//       .post("/register")
//       .set("Authorization", `Bearer ${token_admin}`)
//       .send(newUser);
//     // console.log(response.body, "INI RESPONSE <<<<<<");
//     expect(response.status).toBe(400);
//     expect(response.body).toHaveProperty(
//       "message",
//       "email must be an email format"
//     );
//   });

//   // test("testing user always pass", async () => {
//   //   let response = await request(app)
//   //     .get("/users")
//   //     .set("Authorization", `Bearer ${token_staff}`);
//   //   expect(response.status).toBe(200);
//   //   expect(response.body).toHaveProperty("message", "ehehehehehhehehe");
//   // });
// });

// afterAll(async () => {
//   await queryInterface.bulkDelete("Users", null, {
//     truncate: true,
//     cascade: true,
//     restartIdentity: true,
//   });
// });

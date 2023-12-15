// const request = require("supertest");
// const app = require("../app");
// const { sequelize } = require("../models");
// const { User } = require("../models");
// const { comparePwDecrypted, saltAndHashPw } = require("../helper/bcrypt");
// const { queryInterface } = sequelize;
// const fs = require("fs/promises");
// const path = require("path");
// const { signToken } = require("../helper/jwt");

// let token_admin;
// let token_staff;
// let userAdm;
// let userSt;

// beforeAll(async () => {
//   try {
//     //Adding admin and 1 user to db
//     const userJson = path.join(__dirname, "..", "data", "user_test.json");
//     // console.log(userJson, "PATH BEFOREALL");
//     let dataUser = await fs.readFile(userJson, "utf-8");
//     // console.log(dataUser, "DATAUSER BEFOREALL");
//     let parseDataUser = JSON.parse(dataUser);
//     parseDataUser = await parseDataUser.map((el) => {
//       delete el.id;
//       el.createdAt = el.updatedAt = new Date();
//       el.password = saltAndHashPw(el.password, 10);
//       return el;
//     });
//     await queryInterface.bulkInsert("Users", parseDataUser, {});
//     //finding user
//     userAdm = await User.findByPk(1);
//     userSt = await User.findByPk(2);
//     //Logging in the user

//     token_admin = signToken({ id: userAdm.id, role: userAdm.role });
//     token_staff = signToken({ id: userSt.id, role: userSt.role });
//     // console.log(token_admin, "TOKEN ADMIN")
//     // console.log(token_staff, "TOKEN STAFF")

//     //Adding Types to db
//     const typeJson = path.join(__dirname, "..", "data", "type_test.json");
//     let dataType = await fs.readFile(typeJson, "utf-8");
//     let parseDataType = JSON.parse(dataType);
//     parseDataType = await parseDataType.map((el) => {
//       delete el.id;
//       el.createdAt = el.updatedAt = new Date();
//       return el;
//     });
//     await queryInterface.bulkInsert("Types", parseDataType, {});

//     //Adding Lodgings to db
//     const lodgingsJson = path.join(__dirname, "..", "data", "lodging_test.json");
//     let dataLodging = await fs.readFile(lodgingsJson, "utf-8");
//     let parseDataLodging = JSON.parse(dataLodging);
//     parseDataLodging = await parseDataLodging.map((el) => {
//       delete el.id;
//       el.createdAt = el.updatedAt = new Date();
//       return el;
//     });
//     // console.log(parseDataLodging, "<<<<<<<<<< UBI SUMUS")
//     await queryInterface.bulkInsert("Lodgings", parseDataLodging, {});
//   } catch (error) {
//     // console.log(error, "INI ERROR BEFORE ALL <<<");
//   }
// });

// describe("GET /lodgings", () => {
//   test("should return all Lodging data without user's password", async () => {
//     let response = await request(app)
//       .get("/lodgings")
//       .set("Authorization", `Bearer ${token_staff}`)
//     // console.log(response.body, "INI RESPONSE <<<<<<");
//     expect(response.status).toBe(200);
//     expect(response.body[0]).toHaveProperty("id", expect.any(Number));
//     expect(response.body[0]).toHaveProperty("name", "Sunset Hotel");
//     expect(response.body[0].User).not.toHaveProperty("password");
//   });

//   test("should return error because user hasn't logged on", async () => {
//     let response = await request(app).post("/lodgings")
//     // console.log(response.body, "INI RESPONSE <<<<<<");
//     expect(response.status).toBe(401);
//     expect(response.body).toHaveProperty(
//       "message",
//       "Unauthorized Access, must log in first"
//     );
//   });

//   test("should return error because of an invalid token", async () => {
//     let response = await request(app)
//       .post("/lodgings")
//       .set("Authorization", `Bearer 123`)
//     // console.log(response.body, "INI RESPONSE <<<<<<");
//     expect(response.status).toBe(400);
//     expect(response.body).toHaveProperty("message", "Invalid Token");
//   });

//   // test("testing user always pass", async () => {
//   //   let response = await request(app)
//   //     .get("/users")
//   //     .set("Authorization", `Bearer ${token_admin}`);
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
//   await queryInterface.bulkDelete("Types", null, {
//     truncate: true,
//     cascade: true,
//     restartIdentity: true,
//   });
//   await queryInterface.bulkDelete("Lodgings", null, {
//     truncate: true,
//     cascade: true,
//     restartIdentity: true,
//   });
// });

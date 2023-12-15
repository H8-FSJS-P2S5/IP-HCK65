// const request = require("supertest");
// const app = require("../app");
// const { sequelize } = require("../models");
// const { User, Lodging } = require("../models");
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
//     const lodgingsJson = path.join(
//       __dirname,
//       "..",
//       "data",
//       "lodging_test.json"
//     );
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

// describe("PATCH /lodgings/:id", () => {
//   test("should return patched specified lodging data", async () => {
//     let lodgingId = 1;
//     let photo_path = path.join(__dirname, "..", "data", "test_photo.jpg");
//     const photoTest = {
//       photo: `${photo_path}`,
//     };
//     // console.log(Image)
//     let response = await request(app)
//       .patch(`/lodgings/${lodgingId}`)
//       .attach("photo", photoTest.photo)
//       .set("Authorization", `Bearer ${token_admin}`);
//     // console.log(response.body, "INI RESPONSE <<<<<<");
//     let instance = await Lodging.findByPk(lodgingId);
//     expect(response.status).toBe(200);
//     expect(response.body).toHaveProperty(
//       "message",
//       `Lodging ${instance.name}'s imageUrl has been updated with ${instance.imgUrl}`
//     );
//   }, 30000000);

//   test("should return error because there is no data", async () => {
//     let lodgingId = 999;
//     let photo_path = path.join(__dirname, "..", "data", "test_photo.jpg");
//     const photoTest = {
//       photo: `${photo_path}`,
//     };
//     let response = await request(app)
//       .patch(`/lodgings/${lodgingId}`)
//       .attach("photo", photoTest.photo)
//       .set("Authorization", `Bearer ${token_admin}`);
//     // console.log(response.body, "INI RESPONSE <<<<<<");
//     expect(response.status).toBe(404);
//     expect(response.body).toHaveProperty("message", "Lodging not found");
//   });

//   test("should return error because there is no Image provided", async () => {
//     let lodgingId = 1;
//     let photo_path = path.join(__dirname, "..", "data", "test_photo.jpg");
//     const photoTest = {
//       photo: `${photo_path}`,
//     };
//     let response = await request(app)
//       .patch(`/lodgings/${lodgingId}`)
//       .set("Authorization", `Bearer ${token_admin}`);
//     // console.log(response.body, "INI RESPONSE <<<<<<");
//     expect(response.status).toBe(400);
//     expect(response.body).toHaveProperty("message", "data is required");
//   });

//   test("should return error because user hasn't logged on", async () => {
//     let lodgingId = 1;
//     let photo_path = path.join(__dirname, "..", "data", "test_photo.jpg");
//     const photoTest = {
//       photo: `${photo_path}`,
//     };
//     const photo = await fs.readFile(photo_path);
//     let response = await request(app)
//       .patch(`/lodgings/${lodgingId}`)
//       .attach("photo", photo, { filename: "test_photo.jpg" });
//     // console.log(response.body, "INI RESPONSE <<<<<<");
//     expect(response.status).toBe(401);
//     expect(response.body).toHaveProperty(
//       "message",
//       "Unauthorized Access, must log in first"
//     );
//   }); //KENAPA ECONNRESET????? === BUG DARI SUPERTEST, DARI SUPERAGENTNYA

//   test("should return error because of an invalid token", async () => {
//     let lodgingId = 1;
//     let photo_path = path.join(__dirname, "..", "data", "test_photo.jpg");
//     const photoTest = {
//       photo: `${photo_path}`,
//     };
//     const photo = await fs.readFile(photo_path);
//     let response = await request(app)
//       .patch(`/lodgings/${lodgingId}`)
//       .attach("photo", photo, { filename: "test_photo.jpg" })
//       .set("Authorization", `Bearer aeng aeng`);
//     // console.log(response.body, "INI RESPONSE <<<<<<");
//     expect(response.status).toBe(400);
//     expect(response.body).toHaveProperty("message", "Invalid Token");
//   }); //SUPERTEST BUG

//   test("should return error staff is unauthorized to edit someone else's data", async () => {
//     let lodgingId = 1;
//     let photo_path = path.join(__dirname, "..", "data", "test_photo.jpg");
//     const photoTest = {
//       photo: `${photo_path}`,
//     };
//     let response = await request(app)
//       .put(`/lodgings/${lodgingId}`)
//       .attach("photo", photoTest.photo)
//       .set("Authorization", `Bearer ${token_staff}`);
//     // console.log(response.body, "INI RESPONSE <<<<<<");
//     expect(response.status).toBe(403);
//     expect(response.body).toHaveProperty(
//       "message",
//       "Forbidden, you are not authorized"
//     );
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

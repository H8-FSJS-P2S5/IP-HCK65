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
//   } catch (error) {
//     // console.log(error, "INI ERROR BEFORE ALL <<<");
//   }
// });

// describe("POST /lodgings", () => {
//   test("should return new lodging data", async () => {
//     const newLodging = {
//       name: "Harbor View Inn",
//       facility: "Scenic harbor views, restaurant",
//       roomCapacity: 35,
//       imgUrl: "https://example.com/harbor_view_inn.jpg",
//       location: "Makassar, Indonesia",
//       price: 600000,
//       typeId: "2",
//       authorId: 9,
//     };
//     let response = await request(app)
//       .post("/lodgings")
//       .set("Authorization", `Bearer ${token_admin}`)
//       .send(newLodging);
//     // console.log(response.body, "INI RESPONSE <<<<<<");
//     expect(response.status).toBe(201);
//     expect(response.body).toHaveProperty("id", expect.any(Number));
//     expect(response.body).toHaveProperty("name", newLodging.name);
//     expect(response.body).toHaveProperty("facility", newLodging.facility);
//     expect(response.body).toHaveProperty(
//       "roomCapacity",
//       newLodging.roomCapacity
//     );
//     expect(response.body).toHaveProperty("imgUrl", newLodging.imgUrl);
//     expect(response.body).toHaveProperty("location", newLodging.location);
//     expect(response.body).toHaveProperty("price", newLodging.price);
//     expect(response.body).toHaveProperty("typeId", newLodging.typeId);
//     expect(response.body).toHaveProperty("authorId", userAdm.id);
//   });

//   test("should return error because user hasn't logged on", async () => {
//     const newLodging = {
//       name: "Harbor View Inn",
//       facility: "Scenic harbor views, restaurant",
//       roomCapacity: 35,
//       imgUrl: "https://example.com/harbor_view_inn.jpg",
//       location: "Makassar, Indonesia",
//       price: 600000,
//       typeId: 2,
//       authorId: 9,
//     };
//     let response = await request(app).post("/lodgings").send(newLodging);
//     // console.log(response.body, "INI RESPONSE <<<<<<");
//     expect(response.status).toBe(401);
//     expect(response.body).toHaveProperty(
//       "message",
//       "Unauthorized Access, must log in first"
//     );
//   });

//   test("should return error because of an invalid token", async () => {
//     const newLodging = {
//       name: "Harbor View Inn",
//       facility: "Scenic harbor views, restaurant",
//       roomCapacity: 35,
//       imgUrl: "https://example.com/harbor_view_inn.jpg",
//       location: "Makassar, Indonesia",
//       price: 600000,
//       typeId: 2,
//       authorId: 9,
//     };
//     let response = await request(app)
//       .post("/lodgings")
//       .set("Authorization", `Bearer 123`)
//       .send(newLodging);
//     // console.log(response.body, "INI RESPONSE <<<<<<");
//     expect(response.status).toBe(400);
//     expect(response.body).toHaveProperty("message", "Invalid Token");
//   });

//   test("should return error because typeId in input has no PK in Types", async () => {
//     const newLodging = {
//       name: "Harbor View Inn",
//       facility: "Scenic harbor views, restaurant",
//       roomCapacity: 35,
//       imgUrl: "https://example.com/harbor_view_inn.jpg",
//       location: "Makassar, Indonesia",
//       price: 600000,
//       typeId: 555,
//       authorId: 9,
//     };
//     let response = await request(app)
//       .post("/lodgings")
//       .set("Authorization", `Bearer ${token_admin}`)
//       .send(newLodging);
//     // console.log(response.body, "INI RESPONSE <<<<<<");
//     expect(response.status).toBe(400);
//     expect(response.body).toHaveProperty("message", "failed to update lodging because lodging type is not found");
//   });

//   test("should return error because inputted fields violates type constraint", async () => {
//     const newLodging = {
//       name: "Harbor View Inn",
//       facility: "Scenic harbor views, restaurant",
//       roomCapacity: 35,
//       imgUrl: "https://example.com/harbor_view_inn.jpg",
//       location: "Makassar, Indonesia",
//       price: 600000,
//       typeId: "LLLLLLLLLL",
//       authorId: 9,
//     };
//     let response = await request(app)
//       .post("/lodgings")
//       .set("Authorization", `Bearer ${token_admin}`)
//       .send(newLodging);
//     // console.log(response.body, "INI RESPONSE <<<<<<");
//     expect(response.status).toBe(400);
//     expect(response.body).toHaveProperty("message", "failed to update lodging because wrong data type is inputted");
//   });


//   test("should return error because it violates one validation on sequelize", async () => {
//     const newLodging = {
//       name: "Harbor View Inn",
//       facility: "",
//       roomCapacity: 35,
//       imgUrl: "https://example.com/harbor_view_inn.jpg",
//       location: "Makassar, Indonesia",
//       price: 600000,
//       typeId: 2,
//       authorId: 9,
//     };
//     let response = await request(app)
//       .post("/lodgings")
//       .set("Authorization", `Bearer ${token_admin}`)
//       .send(newLodging);
//     // console.log(response.body, "INI RESPONSE <<<<<<");
//     expect(response.status).toBe(400);
//     expect(response.body).toHaveProperty("message", "Lodging's facility is required");
//   });

//   test("should return error because it violates multiple validation on sequelize", async () => {
//     const newLodging = {
//       name: "Harbor View Inn",
//       facility: "",
//       roomCapacity: "",
//       imgUrl: "https://example.com/harbor_view_inn.jpg",
//       location: "Makassar, Indonesia",
//       price: 600000,
//       typeId: 2,
//       authorId: 9,
//     };
//     let response = await request(app)
//       .post("/lodgings")
//       .set("Authorization", `Bearer ${token_admin}`)
//       .send(newLodging);
//     // console.log(response.body, "INI RESPONSE <<<<<<");
//     expect(response.status).toBe(400);
//     expect(response.body).toHaveProperty("message", ["Lodging's facility is required", "Lodging's room capacity is required"]);
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
// });

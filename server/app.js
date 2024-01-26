if (process.env.NODE_ENV !== "production") require("dotenv").config();
const express = require("express");
const router = require("./routers");
const app = express();
// const port = 3000;
const cors = require("cors");
const errorHandler = require("./middlewares/errorHandler");

app.use(require("morgan")("dev"));
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(router);
app.use(errorHandler);

module.exports = app;

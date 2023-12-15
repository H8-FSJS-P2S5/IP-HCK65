if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const port = process.env.PORT || 3000;
const express = require("express");

const cors = require("cors");
const router = require("./routes");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());
app.use(router);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

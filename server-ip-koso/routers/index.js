const express = require("express");
const router = express.Router();
const user = require("./user");
const myanime = require("./myanime");
const animes = require("./animes");

const ControllerUser = require("../controllers/controllerUser");
const ControllerGlobal = require("../controllers/controllerGlobal");

const { isLoggedIn } = require("../middleware/authentication");

router.get("/", ControllerGlobal.getLaid);
router.post("/register", ControllerGlobal.registerUser);
router.post("/login", ControllerUser.login);

router.use("/users", isLoggedIn, user);
router.use("/myanime", isLoggedIn, myanime);

router.use("/animes", isLoggedIn, animes);

router.post("/pay/stripe", isLoggedIn, ControllerGlobal.postPay);
router.patch("/upgrade", isLoggedIn, ControllerGlobal.upgradeAcc);

module.exports = router;

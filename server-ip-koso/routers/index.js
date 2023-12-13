const express = require("express");
const ControllerGlobal = require("../controllers/controllerGlobal");
const router = express.Router();
// const user = require("./user");
// const { isLoggedIn } = require("../middleware/authentication");

router.get("/", ControllerGlobal.getLaid);
router.post("/pay/stripe", ControllerGlobal.postPay);
router.put("/upgrade", ControllerGlobal.upgradeAcc);

module.exports = router;

const express = require("express");
const router = express.Router();
const authCountroller = require("./../controlleres/authController");

router.route("/signup").post(authCountroller.signUp);

module.exports = router;

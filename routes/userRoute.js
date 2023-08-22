const express = require("express");
const router = express.Router();
const authCountroller = require("./../controlleres/authController");

router.route("/signup").post(authCountroller.signUp);
router.route("/signin").post(authCountroller.signIn);

module.exports = router;

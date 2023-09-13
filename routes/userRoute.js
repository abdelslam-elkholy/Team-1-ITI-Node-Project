const express = require("express");
const router = express.Router();
const authCountroller = require("./../controlleres/authController");

router.route("/signup").post(authCountroller.signUp);
router.route("/signin").post(authCountroller.signIn);

router.route("/forgotPassword").post(authCountroller.forgotPassword);
module.exports = router;

const express = require("express");
const router = express.Router();
const categoryCountroller = require("./../controlleres/categoryController");

router.route("/signup").post(authCountroller.signUp);
router.route("/signin").post(authCountroller.signIn);

module.exports = router;

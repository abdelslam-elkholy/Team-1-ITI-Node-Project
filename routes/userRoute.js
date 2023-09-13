const express = require("express");
const router = express.Router();
const authCountroller = require("./../controlleres/authController");

router.route("/signup").post(authCountroller.signUp);
router.route("/signin").post(authCountroller.signIn);
router.route("/signout").get(authCountroller.signOut);

router.route("/resetPassword/:token").patch(authCountroller.resetPassword);
router.route("/updatePassword").patch(authCountroller.updatePassword);
router.route("/forgotPassword").post(authCountroller.forgotPassword);

router
  .route("/updateMe")
  .patch(authCountroller.protect, authCountroller.updateMe);
router
  .route("/deleteMe")
  .delete(authCountroller.protect, authCountroller.deleteMe);

module.exports = router;

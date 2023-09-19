const express = require("express");
const router = express.Router();
const authCountroller = require("./../controlleres/authController");
const userController = require("./../controlleres/userController");

router.route("/signup").post(authCountroller.signUp);
router.route("/signin").post(authCountroller.signIn);

// router.route("/signout").get(authCountroller.signOut);
// router.route("/resetPassword/:token").patch(authCountroller.resetPassword);
// router.route("/updatePassword").patch(authCountroller.updatePassword);
// router.route("/forgotPassword").post(authCountroller.forgotPassword);

router.route("/").get(userController.getAllUsers);
router
  .route("/updateMe")
  .patch(authCountroller.protect, userController.updateMe);
router
  .route("/deleteMe")
  .delete(authCountroller.protect, userController.deleteMe);

router
  .route("/:id")
  .get(userController.getOneUser)
  .delete(userController.deleteUser);

router
  .route("/activate/:id")
  .patch(userController.activateUser)
  .delete(userController.deactivateUser);

router;
module.exports = router;

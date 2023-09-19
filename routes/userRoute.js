const express = require("express");
const router = express.Router();
const authCountroller = require("./../controlleres/authController");
const userController = require("./../controlleres/userController");

router.route("/signup").post(authCountroller.signUp);
router.route("/signin").post(authCountroller.signIn);

router.route("/").get(userController.getAllUsers);
router.route("/deactivated").get(userController.getDeactivatedUsers);
router.route("/hosts").get(userController.getHosts);

router.route("/:id").delete(userController.deleteUser);
router.route("/activate/:id").get(userController.activateUser);
router.route("/deactivate/:id").delete(userController.deactivateUser);
router.route("/makeHost/:id").get(userController.makeHost);

router
  .route("/updateMe")
  .patch(authCountroller.protect, userController.updateMe);
router
  .route("/deleteMe")
  .delete(authCountroller.protect, userController.deleteMe);

// router.route("/signout").get(authCountroller.signOut);
// router.route("/resetPassword/:token").patch(authCountroller.resetPassword);
// router.route("/updatePassword").patch(authCountroller.updatePassword);
// router.route("/forgotPassword").post(authCountroller.forgotPassword);
module.exports = router;

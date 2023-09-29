const express = require("express");
const router = express.Router();
const authController = require("./../controlleres/authController");
const userController = require("./../controlleres/userController");

const protectAdminRoutes = [
  authController.protect,
  authController.restrictTo("admin"),
];

router.route("/signup").post(authController.signUp);
router.route("/signin").post(authController.signIn);

router.route("/").get(...protectAdminRoutes, userController.getAllUsers);
router
  .route("/deactivated")
  .get(...protectAdminRoutes, userController.getDeactivatedUsers);
router.route("/hosts").get(...protectAdminRoutes, userController.getHosts);

router.route("/:id").delete(...protectAdminRoutes, userController.deleteUser);
router
  .route("/activate/:id")
  .get(...protectAdminRoutes, userController.activateUser);
router
  .route("/deactivate/:id")
  .delete(...protectAdminRoutes, userController.deactivateUser);
router
  .route("/makeHost/:id")
  .get(...protectAdminRoutes, userController.makeHost);
router
  .route("/deleteHost/:id")
  .delete(...protectAdminRoutes, userController.deleteHost);

router
  .route("/updateMe")
  .patch(authController.protect, userController.updateMe);
router
  .route("/deleteMe")
  .delete(authController.protect, userController.deleteMe);

router.route("/getMe").get(authController.protect, userController.getMe);

// router.route("/signout").get(authController.signOut);
// router.route("/resetPassword/:token").patch(authController.resetPassword);
// router.route("/updatePassword").patch(authController.updatePassword);
// router.route("/forgotPassword").post(authController.forgotPassword);
module.exports = router;

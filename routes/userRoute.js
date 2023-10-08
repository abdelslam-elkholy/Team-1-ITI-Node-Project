const express = require("express");
const router = express.Router();
const authController = require("./../controlleres/authController");
const userController = require("./../controlleres/userController");

router.post("/signup", authController.signUp);
router.post("/signin", authController.signIn);

router.use(authController.protect);

router.get("/getMe", userController.getMe);
router.patch("/updateMe", userController.updateMe);
router.delete("/deleteMe", userController.deleteMe);

router.use(authController.restrictTo("admin"));

router.get("/", userController.getAllUsers);
router.get("/deactivated", userController.getDeactivatedUsers);
router.get("/hosts", userController.getHosts);

router.delete("/deactivate/:id", userController.deactivateUser);
router.delete("/:id", userController.deleteUser);
router.delete("/deleteHost/:id", userController.deleteHost);
router.get("/activate/:id", userController.activateUser);
router.get("/makeHost/:id", userController.makeHost);

// router.route("/signout").get(authController.signOut);
// router.route("/resetPassword/:token").patch(authController.resetPassword);
// router.route("/updatePassword").patch(authController.updatePassword);
// router.route("/forgotPassword").post(authController.forgotPassword);
module.exports = router;

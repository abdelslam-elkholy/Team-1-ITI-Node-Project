const express = require("express");
const router = express.Router();
const wishlistController = require("../controlleres/wishlistController");
const authController = require("./../controlleres/authController");

router.use(authController.protect);

router.route("/").post(wishlistController.createWishlist);
router.route("/:id").delete(wishlistController.deleteWishlist);
router.route("/me").get(wishlistController.getWishlistsByUserId);

module.exports = router;

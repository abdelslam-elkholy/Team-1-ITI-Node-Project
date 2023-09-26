const express = require("express");
const router = express.Router();
const wishlistController = require("../controlleres/wishlistController");
const authController = require("./../controlleres/authController");

router
  .route("/")

  .post(authController.protect, wishlistController.createWishlist);

router
  .route("/:id")

  .delete(wishlistController.deleteWishlist);

router.route("/user/:id").get(wishlistController.getWishlistsByUserId);

module.exports = router;

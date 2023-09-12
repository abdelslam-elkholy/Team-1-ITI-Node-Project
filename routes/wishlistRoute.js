const express = require("express");
const router = express.Router();
const wishlistController = require("../controlleres/wishlistController");

router
  .route("/")
  .get(wishlistController.getAllWishlists)
  .post(wishlistController.createWishlist);
router
  .route("/:id")
  .get(wishlistController.getWishlist)
  .delete(wishlistController.deleteWishlist);

router.route("/user/:id").get(wishlistController.getWishlistsByUserId);

module.exports = router;

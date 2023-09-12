const express = require("express");
const router = express.Router();
const wishlistController = require("./../controllers/wishlistController");

router
  .route("/")
  .get(wishlistController.getWishlists)
  .post(wishlistController.createWishlist);
router
  .route("/:id")
  .get(wishlistController.getWishlist)
  .delete(wishlistController.deleteWishlist);

router.route("/user/:id").get(wishlistController.getUserWishlists);

module.exports = router;

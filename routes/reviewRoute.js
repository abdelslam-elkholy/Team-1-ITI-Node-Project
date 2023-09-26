const express = require("express");
const router = express.Router();
const reviewController = require("../controlleres/reviewController");
const authController = require("./../controlleres/authController");

router
  .route("/")
  .get(reviewController.getAllRivews)
  .post(authController.protect, reviewController.createRivew);

router
  .route("/:id")
  .get(reviewController.getRivew)
  .patch(authController.protect, reviewController.updateRivew)
  .delete(authController.protect, reviewController.deleteRivew);

router
  .route("/user/:id")
  .get(
    authController.protect,
    authController.accessControl,
    reviewController.getRivewsByUserId
  );
router.route("/house/:id").get(reviewController.getRivewsByHouseId);

module.exports = router;

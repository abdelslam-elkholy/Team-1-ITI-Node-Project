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
  .patch(reviewController.updateRivew)
  .delete(reviewController.deleteRivew);

router.route("/user/:id").get(reviewController.getRivewsByUserId);
router.route("/house/:id").get(reviewController.getRivewsByHouseId);

module.exports = router;

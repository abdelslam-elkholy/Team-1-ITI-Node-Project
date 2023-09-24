const express = require("express");
const router = express.Router();
const reservationController = require("./../controlleres/reservationController");
const authController = require("./../controlleres/authController");

router
  .route("/")
  .get(
    // authController.restrictTo("admin"),
    reservationController.getAllReservations
  )
  .post(authController.protect, reservationController.createReservation);
router
  .route("/:id")
  .get(reservationController.getReservation)
  .delete(reservationController.deleteReservation);

router.route("/user/:id").get(reservationController.getReservationsByUserId);
router.route("/house/:id").get(reservationController.getReservationsByHouseId);

module.exports = router;

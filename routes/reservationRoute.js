const express = require("express");
const router = express.Router();
const reservationController = require("./../controlleres/reservationController");
const authController = require("./../controlleres/authController");

router
  .route("/")
  .get(
    authController.protect,
    authController.accessControl,
    reservationController.getAllReservations
  )
  .post(authController.protect, reservationController.createReservation);
router
  .route("/:id")
  .delete(
    authController.protect,
    authController.accessControl,
    reservationController.deleteReservation
  );

router
  .route("/user/:id")
  .get(
    authController.protect,
    authController.accessControl,
    reservationController.getReservationsByUserId
  );
router.route("/house/:id").get(reservationController.getReservationsByHouseId);

module.exports = router;

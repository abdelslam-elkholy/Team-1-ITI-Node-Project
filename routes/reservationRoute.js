const express = require("express");
const router = express.Router();
const reservationController = require("./../controlleres/reservationController");
const authController = require("./../controlleres/authController");

const protectAdminRoutes = [
  authController.protect,
  authController.restrictTo("admin"),
];

router
  .route("/")
  .get(...protectAdminRoutes, reservationController.getAllReservations)
  .post(authController.protect, reservationController.payment);

router
  .route("/:id")
  .delete(authController.protect, reservationController.deleteReservation);

router
  .route("/user/:id")
  .get(
    authController.protect,
    authController.accessControl,
    reservationController.getReservationsByUserId
  );

router
  .route("/house/:id")
  .get(...protectAdminRoutes, reservationController.getReservationsByHouseId);

module.exports = router;

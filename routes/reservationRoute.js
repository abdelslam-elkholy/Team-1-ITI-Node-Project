const express = require("express");
const router = express.Router();
const reservationController = require("./../controllers/reservationController");
const authMiddleware = require("./../middlewares/authMiddleware");

router
  .route("/")
  .get(reservationController.getReservations)
  .post(reservationController.createReservation);
router
  .route("/:id")
  .get(reservationController.getReservation)
  .patch(reservationController.updateReservation)
  .delete(reservationController.deleteReservation);

router.route("/user/:id").get(reservationController.getUserReservations);
router.route("/house/:id").get(reservationController.getHouseReservations);

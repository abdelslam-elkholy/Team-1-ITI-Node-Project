const express = require("express");
const router = express.Router();
const reservationController = require("./../controlleres/reservationController");
const authMiddleware = require("./../middlewares/authMiddleware");

router
  .route("/")
  .get(reservationController.getAllReservations)
  .post(reservationController.createReservation);
router
  .route("/:id")
  .get(reservationController.getReservation)
  .patch(reservationController.updateReservation)
  .delete(reservationController.deleteReservation);

router.route("/user/:id").get(reservationController.getReservationsByUserId);
router.route("/house/:id").get(reservationController.getReservationsByHouseId);

module.exports = router;

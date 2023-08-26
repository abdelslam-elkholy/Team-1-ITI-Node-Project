const fs = require("fs");
const express = require("express");
const router = express.Router();
// const authentication = require("../middlewares/authentication");
var {
    getAllReservations,
    saveReservation,
    getReservationById,
    updateReservationById,
    deleteReservationById,
} = require("../controlleres/ReservationController");
const { error } = require("console");
//==============================================
// router.use(authentication);
// get all Reservations

router.get("/", async (req, res) => {
  try {
    var Reservations = await getAllReservations();
    res.json({ data: Reservations });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// save Reservation

router.post("/",  async (req, res) => {
  var hostId = req.body.hostId;
  var userId = req.body.userId;
  var checkinDate = req.body.checkinDate;
  var checkoutDate = req.body.checkoutDate;
  var price = req.body.price;

  try {
    var newReservation = await saveReservation({userId:userId, price:price,checkoutDate:checkoutDate,checkinDate:checkinDate,hostId: hostId});
   
    res.status(201).json({ data: newReservation });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//get Reservation by id

router.get("/:id", async (req, res) => {
  var { id } = req.params;
  try {
    var newReservation = await getReservationById(id);
    if (newReservation) {
      res.status(201).json({ data: newReservation });
    } else {
      res.status(404).json({ message: "Not found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// update newReservation by id
router.patch("/:id", async (req, res) => {
  var { hostId, checkinDate ,checkoutDate,price} = req.body;
  var { id } = req.params;
  try {
    var Reservation = await updateReservationById(id, hostId, checkinDate,checkoutDate,price);
    if (Reservation) {
      res.status(200).json({ data: Reservation });
    } else {
      res.status(404).json({ message: "Not found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// delete Reservation by id
router.delete("/:id", async (req, res) => {
  var { id } = req.params;
  try {
    var newReservation = await deleteReservationById(id);
    if (newReservation) {
      res.status(201).json({ message: "Deleted", data: newReservation });
    } else {
      res.status(404).json({ message: "Not found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
module.exports = router;

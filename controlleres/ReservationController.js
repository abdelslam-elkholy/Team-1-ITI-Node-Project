const fs = require("fs");
var ReservationModel = require("../models/Reservation");
function getAllReservations() {
    return ReservationModel.find().populate("hostId","userId");
  }
  
  function saveReservation(Reservation) {
    return ReservationModel.create(Reservation);
  }
  
  function getReservationById(id) {
    return ReservationModel.findOne({ _id: id }).populate("hostId","userId");
  }
  
  function updateReservationById(id, checkinDate, checkoutDate) {
    return ReservationModel
      .findByIdAndUpdate(id, { checkinDate: checkinDate, checkoutDate: checkoutDate }, { new: true })
      .populate("hostId","userId");
  }
  
  function deleteReservationById(id) {
    return ReservationModel.findByIdAndDelete({ _id: id }).populate("hostId","userId");
  }
  //================================================
  module.exports = {
    getAllReservations,
    saveReservation,
    getReservationById,
    updateReservationById,
    deleteReservationById,
  };
  
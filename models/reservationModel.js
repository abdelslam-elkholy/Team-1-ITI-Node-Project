const mongoose = require("mongoose");

const reservationSchema = new mongoose.Schema(
  {
    houseId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "house",
      require: true,
    },
    userId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "user",
      require: true,
    },
    checkIn: {
      type: Date,
      require: true,
    },
    checkOut: {
      type: Date,
      require: true,
    },
    price: {
      type: Number,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

const Reservation = mongoose.model("reservation", reservationSchema);
module.exports = Reservation;

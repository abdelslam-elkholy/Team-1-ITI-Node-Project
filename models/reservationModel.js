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

reservationSchema.pre(/^find/, function (next) {
  this.populate({
    path: "userId houseId",
    select: "-__v",
  });
  next();
});

const Reservation = mongoose.model("reservation", reservationSchema);
module.exports = Reservation;

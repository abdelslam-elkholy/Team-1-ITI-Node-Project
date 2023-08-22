const mongoose = require("mongoose");

var hostSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: [5, "title is less than 3 characters"],
    maxLength: [80, "title is more than 80 characters"],
    required: true,
    trim: true,
  },
  address: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  currencySymbol: {
    type: String,
    enum: ["$", "€", "EGP"],
    default: "$",
    required: false,
  },
  numberOfRooms: {
    type: Number,
    required: true,
  },
  numberOfBedrooms: {
    type: Number,
    required: true,
  },
  guestNumber: {
    type: Number,
    required: true,
  },
  rate: {
    type: Number,
  },
  description: {
    type: String,
  },
  comment: {
    type: String,
  },
  images: {
    type: String,
  },
  category: {
    type: String,
  },
  userId: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User",
  },
});

var hostModel = mongoose.model("host", hostSchema);
module.exports = hostModel;

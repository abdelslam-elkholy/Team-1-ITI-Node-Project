const mongoose = require("mongoose");

const houseSchema = new mongoose.Schema({
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

  images: {
    type: [String],
    required: true,
  },

  category: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User",
  },
});

const House = mongoose.model("house", houseSchema);

module.exports = House;

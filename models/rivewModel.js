const mongoose = require("mongoose");

const rivewsSchema = new mongoose.Schema({
  houseId: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "house",
  },
  userId: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "user",
  },
  Rate: {
    type: Number,
    enum: [1, 2, 3, 4, 5],
    default: 1,
    require: true,
  },
  rivew: {
    type: String,
    require: true,
  },
});

const Rivew = mongoose.model("rivew", rivewsSchema);
module.exports = Rivew;

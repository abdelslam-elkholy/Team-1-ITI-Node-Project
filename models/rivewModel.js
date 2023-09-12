const mongoose = require("mongoose");

const rivewsSchema = new mongoose.Schema({
  HostID: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "house",
  },
  UserID: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "user",
  },
  Rate: {
    type: Number,
    enum: [1, 2, 3, 4, 5],
    default: 1,
    require: true,
  },
  Rivew: {
    type: Number,
    require: true,
  },
});

const Rivew = mongoose.model("rivew", rivewsSchema);
module.exports = Rivew;

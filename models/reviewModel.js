const mongoose = require("mongoose");
const House = require("./houseModel");

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

rivewsSchema.pre("save", async function (next) {
  try {
    const houseId = this.houseId;
    const reviews = await this.find({ houseId });
    const totalRateSum = reviews.reduce((sum, review) => sum + review.Rate, 0);
    const averageRate = totalRateSum / reviews.length;

    await House.findByIdAndUpdate(houseId, { rate: averageRate });

    next();
  } catch (error) {
    next(error);
  }
});

const Rivew = mongoose.model("rivew", rivewsSchema);
module.exports = Rivew;

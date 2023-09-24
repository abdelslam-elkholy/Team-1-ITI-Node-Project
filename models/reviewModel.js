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
  rate: {
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
    const reviews = await Rivew.find({ houseId });
    const totalRateSum = reviews.reduce((sum, review) => sum + review.Rate, 0);

    if (reviews.length == 0) {
      await House.findByIdAndUpdate(houseId, { rate: this.rate });
      return next();
    }
    const averageRate = totalRateSum / reviews.length;

    await House.findByIdAndUpdate(houseId, { rate: averageRate });
  } catch (error) {
    next(error);
  }
});

const Rivew = mongoose.model("rivew", rivewsSchema);
module.exports = Rivew;

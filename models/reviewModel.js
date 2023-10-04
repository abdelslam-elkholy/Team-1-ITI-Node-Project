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
    min: 1,
    max: 5,
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

    const totalRateSum = reviews.reduce(
      (sum, review) => sum + Number(review.rate),
      0
    );

    if (reviews.length == 0) {
      await House.findByIdAndUpdate(houseId, { rate: this.rate });
      console.log("here");
      return next();
    }

    const averageRate = Number(
      (this.rate + totalRateSum) / (reviews.length + 1)
    ).toFixed(2);

    await House.findByIdAndUpdate(houseId, {
      rate: averageRate,
      ratesNum: reviews.length + 1,
    });
  } catch (error) {
    next(error);
  }
});

rivewsSchema.pre(/^find/, function (next) {
  this.populate({
    path: "houseId",
    select: "-__v",
  });
  next();
});

const Rivew = mongoose.model("rivew", rivewsSchema);
module.exports = Rivew;

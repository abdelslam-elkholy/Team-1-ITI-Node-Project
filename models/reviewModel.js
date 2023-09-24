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

// pre save middleware to calculate the average rate of the house
rivewsSchema.pre("save", async function (next) {
  try {
    const houseId = this.houseId;
    const reviews = await Rivew.find({ houseId });

    // calculate the Total rate
    const totalRateSum = reviews.reduce(
      (sum, review) => sum + Number(review.rate),
      0
    );

    //check if there is no reviews
    if (reviews.length == 0) {
      await House.findByIdAndUpdate(houseId, { rate: this.rate });
      console.log("here");
      return next();
    }

    // calculate the average rate
    const averageRate = Number(
      (this.rate + totalRateSum) / (reviews.length + 1)
    ).toFixed(2);

    // update the house rate
    await House.findByIdAndUpdate(houseId, { rate: averageRate });
  } catch (error) {
    next(error);
  }
});

const Rivew = mongoose.model("rivew", rivewsSchema);
module.exports = Rivew;

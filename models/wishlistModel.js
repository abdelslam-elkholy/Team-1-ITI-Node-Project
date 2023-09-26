const mongoose = require("mongoose");

const wishlistSchema = new mongoose.Schema({
  userId: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "user",
  },
  houseId: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "house",
  },
});

wishlistSchema.pre(/^find/, function (next) {
  this.populate({
    path: "userId houseId",
    select: "-__v",
  });
  next();
});

const Wishlist = mongoose.model("wishlist", wishlistSchema);
module.exports = Wishlist;

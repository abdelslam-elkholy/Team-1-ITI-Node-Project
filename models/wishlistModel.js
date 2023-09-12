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

const Wishlist = mongoose.model("wishlist", wishlistSchema);
module.exports = Wishlist;

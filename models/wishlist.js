const mongoose = require("mongoose");

var wishlistSchema = new mongoose.Schema({
  userId: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User",
  },
  hostId: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Host",
  },
});

var wishlistModel = mongoose.model("wishlist", wishlistSchema);
module.exports = wishlistModel;

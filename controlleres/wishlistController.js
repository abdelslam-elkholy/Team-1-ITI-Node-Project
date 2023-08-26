const fs = require("fs");
const wishlistModel = require("../models/wishlist");

// post
function saveWishlist(wishlist) {
  return wishlistModel.create(wishlist);
}
//   get all
function getAllWishlist() {
  return wishlistModel.find().populate("hostId", "userId");
}
//   get by id
function getWishlistById(id) {
  return wishlistModel.findOne({ _id: id }).populate("hostId", "userId");
}
//   edit by id
function updateWishlistById(id) {
  return wishlistModel.findByIdAndUpdate(id).populate("hostId", "userId");
}

function deleteWishlistById(id) {
  return wishlistModel
    .findByIdAndDelete({ _id: id })
    .populate("hostId", "userId");
}
//================================================
module.exports = {
  saveWishlist,
  getAllWishlist,
  getWishlistById,
  updateWishlistById,
  deleteWishlistById,
};

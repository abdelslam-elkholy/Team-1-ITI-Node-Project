const Wishlist = require("../models/wishlistModel");
const { AppError } = require("../utils/appError");

exports.createWishlist = async (req, res, next) => {
  try {
    const newWishlist = await Wishlist.create({
      ...req.body,
      userId: req.user._id,
    });

    res.status(201).json({
      status: "success",
      data: {
        wishlist: newWishlist,
      },
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};

exports.deleteWishlist = async (req, res, next) => {
  try {
    const wishlist = await Wishlist.findOneAndDelete({
      houseId: req.params.id,
      userId: req.user._id,
    });

    if (!wishlist) {
      return next(
        new AppError(`There is no wishlist with the id ${req.params.id}`, 404)
      );
    }

    res.status(200).json({
      status: "Success",
      data: {
        wishlist,
      },
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};

exports.getWishlistsByUserId = async (req, res, next) => {
  try {
    const wishlists = await Wishlist.find({ userId: req.user._id });
    const wishlist = wishlists.map((wishlist) => wishlist.houseId);
    res.status(200).json({
      status: "Success",
      data: {
        wishlist,
      },
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};

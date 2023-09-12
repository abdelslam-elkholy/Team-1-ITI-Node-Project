const Wishlist = require("../models/wishlistModel");
const { AppError } = require("../utils/appError");

exports.getAllWishlists = async (req, res, next) => {
  try {
    const wishlists = await Wishlist.find();

    res.status(200).json({
      status: "success",
      wishlistCount: wishlists.length,
      data: {
        wishlists,
      },
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};
exports.createWishlist = async (req, res, next) => {
  try {
    const newWishlist = await Wishlist.create(req.body);

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

exports.getWishlist = async (req, res, next) => {
  try {
    const wishlist = await Wishlist.findById(req.params.id);

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

exports.deleteWishlist = async (req, res, next) => {
  try {
    const wishlist = await Wishlist.findByIdAndDelete(req.params.id);

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
    const wishlist = await Wishlist.find({ userId: req.params.id });

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

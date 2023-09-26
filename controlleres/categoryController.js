const Category = require("../models/categoryModel");
const catchAsync = require("../utils/catchAsync");
const { AppError } = require("../utils/appError");

exports.createCategory = async (req, res, next) => {
  try {
    const category = await Category.create(req.body);
    res.status(201).json({
      message: "created",
      data: {
        category,
      },
    });
  } catch (error) {
    return next(new AppError(error.message, 400));
  }
};

exports.getCategories = async (req, res, next) => {
  try {
    const categories = await Category.find();

    res.status(200).json({
      message: "success",
      data: {
        categories,
      },
    });
  } catch (error) {
    return next(new AppError(error.message, 400));
  }
};

exports.getCategory = async (req, res, next) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category)
      return next(
        new AppError(`There Is no Category With The Id ${req.params.id}`, 404)
      );

    res.status(200).json({
      message: "success",
      data: {
        category,
      },
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};

exports.updateCategory = async (req, res, next) => {
  try {
    const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!category)
      return next(
        new AppError(`There Is No Category With The Id ${req.params.id}`, 404)
      );

    res.status(200).json({
      message: "success",
      data: {
        category,
      },
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};

exports.deleteCategory = async (req, res, next) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);

    if (!category)
      return next(
        new AppError(`There Is no Category With The Id ${req.params.id}`, 404)
      );

    res.status(200).json({
      message: "success",
      data: {
        category,
      },
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};

const Category = require("../models/categoryModel");
const catchAsync = require("../utils/catchAsync");
const { AppError } = require("./errorHandler");

exports.createCategory = catchAsync(async (req, res, next) => {
  const category = await Category.create({
    name: req.body.name,
    icon: req.body.icon,
  });
  res.status(201).json({
    message: "created",
    data: {
      category,
    },
  });
});

exports.getCategories = catchAsync(async (req, res, next) => {
  const categories = await Category.find();

  res.status(200).json({
    message: "success",
    data: {
      data: categories,
    },
  });
});

exports.getCategory = catchAsync(async (req, res, next) => {
  const category = await Category.findById(req.params.id);
  if (!category)
    return next(
      new AppError(`There Is no Category With The Id ${req.params.id}`, "404")
    );

  res.status(200).json({
    message: "success",
    data: {
      category,
    },
  });
});
exports.updateCategory = catchAsync(async (req, res, next) => {
  const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!category)
    return next(
      new AppError(`There Is no Category With The Id ${req.params.id}`, "404")
    );
  res.status(200).json({
    message: "success",
    data: {
      category,
    },
  });
});

exports.deleteCategory = catchAsync(async (req, res, next) => {
  const category = await Category.findByIdAndDelete(req.params.id);
  if (!category)
    return next(
      new AppError(`There Is no Category With The Id ${req.params.id}`, "404")
    );
  res.status(200).json({
    message: "success",
    data: {
      category,
    },
  });
});

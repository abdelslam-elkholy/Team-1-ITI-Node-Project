const User = require("../models/userModel");
const { appError } = require("../utils/appError");

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });

  return newObj;
};

exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();

    res.status(200).json({
      status: "success",
      userCount: users.length,
      data: {
        users,
      },
    });
  } catch (error) {
    return next(new appError(error.message, 500));
  }
};

exports.updateMe = async (req, res, next) => {
  const filteredBody = filterObj(req.body, "name", "email");
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      filteredBody,
      {
        new: true,
      }
    );
  } catch (error) {
    return next(new appError(error.message, 500));
  }
};

exports.deleteMe = async (req, res, next) => {
  try {
    await User.findByIdAndUpdate(req.user._id, { active: false });

    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (error) {
    return next(new appError(error.message, 500));
  }
};

const User = require("../models/userModel");
const { appError } = require("../utils/appError");

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

const User = require("./../models/userModel");
const AppError = require("./../utils/appError");
const jwt = require("jsonwebtoken");

const createToken = (id) => {
  const token = jwt.sign({ id }, process.env.JWT_STRING, {
    expiresIn: process.env.JWT_EXPIRE,
  });
  return token;
};

exports.signUp = async (req, res, next) => {
  try {
    const user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      confirmPassword: req.body.confirmPassword,
    });

    const token = createToken(user._id);
    res.status(201).json({
      message: "Done",
      token,
      data: {
        user,
      },
    });
  } catch (err) {
    res.status(400).json({
      message: "autherization Failed",
      err: {
        err,
      },
    });
  }
};

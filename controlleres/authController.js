const User = require("./../models/userModel");
const jwt = require("jsonwebtoken");
const { AppError } = require("./../controllers/errorHandler");

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
    next(new AppError(err.message, 400));
  }
};

exports.signIn = async function (req, res, next) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(new AppError("You must Provide Email and password", 400));
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user || !(await user.validatePassword(password))) {
      return next(new AppError("Invalid Email Or Password", 401));
    }

    const token = createToken(user._id);
    res.status(200).json({
      message: "success",
      token,
    });
  } catch (error) {
    return next(new AppError(error.message, 400));
  }
};

const jwt = require("jsonwebtoken");
const { AppError } = require("../utils/appError");
const { promisify } = require("util");

exports.protect = async (req, res, next) => {
  try {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) return next(new AppError("you are not logged in", 401));

    const decoded = await promisify(jwt.verify)(token, process.env.JWT_STRING);
    const existUser = await User.findById(decoded.id);

    if (!existUser) {
      return next(new AppError("the user isnt exist anymore", 401));
    }

    if (existUser.checkChangedPasswordTime(decoded.iat)) {
      return next(new AppError("session ended pleas login again ", 401));
    }

    req.user = existUser;

    next();
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};

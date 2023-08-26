const jwt = require("jsonwebtoken");
const { AppError } = require("./../controllers/errorHandler");
const { promisify } = require("util");

module.exports = async (req, res, next) => {
  if (!req.headers.authorization) {
    return next(new AppError("There Is no token", 401));
  }

  try {
    const decoded = await promisify(jwt.verify)(
      req.headers.authorization,
      process.env.JWT_SECRET
    );
    req.id = decoded.id;
  } catch (err) {
    return next(new AppError("credntilas is wrong", 401));
  }
  next();
};

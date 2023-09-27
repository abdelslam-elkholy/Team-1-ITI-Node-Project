const errorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "failed";

  console.log(err);
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
};

class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "failed" : "error";
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = { AppError, errorHandler };

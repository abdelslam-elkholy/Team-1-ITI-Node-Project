const express = require("express");
const { errorHandler, AppError } = require("./utils/appError");
const rateLimit = require("express-rate-limit");
const cors = require("cors");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");

const houseRoute = require("./routes/houseRoute");
const userRoute = require("./routes/userRoute");
const reservationRoute = require("./routes/reservationRoute");
const reviewRoute = require("./routes/reviewRoute");
const wishlistRoute = require("./routes/wishlistRoute");

const app = express();
const limiter = rateLimit({
  max: 200,
  windowMs: 60 * 60 * 1000,
  message: "Too many requests from this IP, please try again in an hour!",
});

app.use(helmet());
app.use(express.json());
app.use("/", limiter);
app.use(cors());
app.use(mongoSanitize());
app.use(xss());

app.use("/house", houseRoute);
app.use("/user", userRoute);
app.use("/reservation", reservationRoute);
app.use("/review", reviewRoute);
app.use("/wishlist", wishlistRoute);

app.all("*", (req, res, next) => {
  const err = new AppError(`there is nou route for this ${req.originalUrl}`);
  next(err);
});

app.use(errorHandler);

module.exports = app;

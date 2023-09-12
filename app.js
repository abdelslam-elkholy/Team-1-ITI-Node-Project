const express = require("express");
const { errorHandler, AppError } = require("./controlleres/errorController");
const houseRoute = require("./routes/houseRoute");
const userRoute = require("./routes/userRoute");
const reservationRoute = require("./routes/reservationRoute");

const app = express();
app.use(express.json());

app.use("/house", houseRoute);
app.use("/user", userRoute);
app.use("/reservation", reservationRoute);

app.all("*", (req, res, next) => {
  const err = new AppError(`there is nou route for this ${req.originalUrl}`);
  next(err);
});

app.use(errorHandler);

module.exports = app;

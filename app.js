const express = require("express");
const { errorHandler, AppError } = require("./controlleres/errorController");
const hostRoute = require("./routes/hostRoute");
const userRoute = require("./routes/userRoute");

const app = express();
app.use(express.json());

app.use("/host", hostRoute);
app.use("/user", userRoute);

app.all("*", (req, res, next) => {
  const err = new AppError(`there is nou route for this ${req.originalUrl}`);
  next(err);
});

app.use(errorHandler);

module.exports = app;

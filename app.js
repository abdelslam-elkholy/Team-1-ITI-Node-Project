const express = require("express");
const AppError = require("./utils/appError");
const errControler = require("./controlleres/authController");
const hostRoute = require("./routes/hostRoute");
const userRoute = require("./routes/userRoute");

const app = express();
app.use(express.json());

// app.use("/todo", hostRoute);
app.use("/user", userRoute);

// app.all("*", (req, res, next) => {
//   next(new AppError(`Can't find ${req.originalUrl} in the server`, 404));
// });

// app.use(errControler);

module.exports = app;

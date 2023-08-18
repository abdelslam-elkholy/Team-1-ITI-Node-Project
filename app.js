const express = require("express");
const app = express();
const hostRoute = require("./routes/hostRoute");
const userRoute = require("./routes/userRoute");

app.use(express.json());

// app.use("/todo", hostRoute);
// app.use("/user", userRoute);

app.all("*", (req, res, next) => {
  next(
    errorHandeler.createError(
      `Can't find ${req.originalUrl} in the server`,
      404
    )
  );
});

app.use(errControler);

module.exports = app;

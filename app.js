const express = require("express");
const app = express();
const hostRoute = require("./routes/hostRoute");
const userRoute = require("./routes/userRoute");

app.use(express.json());

// app.use("/todo", hostRoute);
// app.use("/user", userRoute);
module.exports = app;

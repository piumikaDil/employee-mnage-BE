// import express, { json } from "express";
const express = require("express");
const createErrors = require("http-errors");
const dotenv = require("dotenv").config();
const cors = require("cors");
const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

require("./initDB")();

const PORT = process.env.PORT || 3000;

const productRoute = require("./Routes/Product.route");
const siteRoute = require("./Routes/Site.route");
const attendanceRoute = require("./Routes/Attendance.route");
const paymentR = require("./Routes/Payment.route");

app.use("/employee", productRoute);
app.use("/site", siteRoute);
app.use("/attendance", attendanceRoute);
app.use("/payment", paymentR);

app.use((req, res, next) => {
  next(createErrors(404, "Not found"));
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    error: {
      status: err.status || 500,
      message: err.message,
    },
  });
});

app.listen(PORT, () => {
  console.log("I am listning " + PORT + "....");
});

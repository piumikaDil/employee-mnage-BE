const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const paymentSchema = new Schema({
  starDate: {
    type: Date,
  },
  endDate: {
    type: Date,
  },
  siteId: {
    type: String,
  },
  employee: {
    type: Array,
  },
  employeeId: {
    type: String,
  },
  employeeName: {
    type: String,
  },
  totalDays: {
    type: Number,
  },
  totalOverTime: {
    type: Number,
  },
  overTimePay: {
    type: Number,
  },
  netPay: {
    type: Number,
  },
  payDate: {
    type: Date,
  },
});

const payment = mongoose.model("payment", paymentSchema);
module.exports = payment;

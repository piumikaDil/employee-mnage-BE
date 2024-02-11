const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const paymentSchema = new Schema({
  starDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  siteId: {
    type: String,
    required: true,
  },
  employee: {
    type: Array,
    required: true,
  },
});

const payment = mongoose.model("payment", paymentSchema);
module.exports = payment;

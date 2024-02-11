const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const employeeSchema = new Schema({
  _id: {
    type: String,
    required: true,
  },
  employeeName: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    // requred:true
  },
  salary: {
    type: Number,
    // requred: true
  },
  otRate: {
    type: Number,
  },
  site: {
    type: String,
  },
  nic: {
    type: String || Number,
    required: true,
  },
});

const Employee = mongoose.model("product", employeeSchema);
module.exports = Employee;

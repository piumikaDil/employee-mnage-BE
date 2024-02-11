const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const attendanceSchema = new Schema({
  id: {
    type: String,
    required: true,
  },
  employeeId: {
    type: String,
    required: true,
  },
  employeeName: {
    type: String,
    required: true,
  },
  inTime: {
    type: String,
    required: true,
  },
  outTime: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
  },
});

const attendance = mongoose.model("attendance", attendanceSchema);
module.exports = attendance;

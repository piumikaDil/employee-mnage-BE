const express = require("express")
const router = express.Router()

const AttendanceController = require("../controller/Attendance.Controller")

router.post("/", AttendanceController.createAttendance)


module.exports = router
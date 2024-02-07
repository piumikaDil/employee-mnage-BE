const express = require("express")
const router = express.Router()

const AttendanceController = require("../controller/Attendance.Controller")

router.get("/", AttendanceController.createAttendance)


module.exports = router
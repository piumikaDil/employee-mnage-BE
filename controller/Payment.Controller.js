const createErrors = require("http-errors");
const mongoose = require("mongoose");

const Attendance = require("../Models/Attendance.models");
const Payment = require("../Models/Payment.models");
const Employee = require("../Models/Employee.models");

module.exports = {
  createPayment: async (req, res, next) => {
    try {
      console.log(req.body);

      const { startDate, endDate, siteId } = req.body;

      const paymentExists = await Payment.findOne({
        date: { $gte: startDate, $lte: endDate },
        siteId: siteId,
      });

      if (paymentExists) {
        next(
          createErrors(
            422,
            "Payment record already exists for the given date range"
          )
        );
        return;
      }

      const employees = await Employee.find({ site: siteId });

      const returnList = [];

      const fetchPromises = employees.map(async (employee) => {
        let totalOvertime = 0;

        const attendances = await Attendance.find({
          date: { $gte: startDate, $lte: endDate },
          employeeId: employee._id,
        });

        attendances.map((attendance) => {
          const { employeeId, employeeName, inTime, outTime } = attendance;
          const timeInParts = inTime.split(":");
          const timeOutParts = outTime.split(":");

          const timeIn = new Date();
          timeIn.setHours(parseInt(timeInParts[0], 10));
          timeIn.setMinutes(parseInt(timeInParts[1], 10));

          const timeOut = new Date();
          timeOut.setHours(parseInt(timeOutParts[0], 10));
          timeOut.setMinutes(parseInt(timeOutParts[1], 10));

          const timeDiffMilliseconds = timeOut - timeIn;

          const diffHours = Math.floor(timeDiffMilliseconds / (1000 * 60 * 60));

          const overtimeWork = diffHours > 8 ? diffHours - 8 : 0;
          totalOvertime += overtimeWork;
        });
        returnList.push({
          employeeId: employee._id,
          employeeName: employee.name,
          totalOvertime,
          totalDays: attendances.length,
          overTimePay: totalOvertime * employee.otRate,
          netPay: employee.salary + totalOvertime * employee.otRate,
        });
      });

      await Promise.all(fetchPromises);

      res.send(returnList);
    } catch (error) {
      console.log(error.message);
      if (error.name === "ValidationError") {
        next(createErrors(422, error.message));
        return;
      }
      next(error);
    }
  },
};

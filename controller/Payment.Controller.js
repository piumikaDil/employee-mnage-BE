const createErrors = require("http-errors");
const mongoose = require("mongoose");

const Attendance = require("../Models/Attendance.models");
const Payment = require("../Models/Payment.models");
const Employee = require("../Models/Employee.models");
const attendance = require("../Models/Attendance.models");
const payment = require("../Models/Payment.models");

module.exports = {
  createPayment: async (req, res, next) => {
    const currentDate = new Date();

    // You can then format the date as needed
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1; // Note: Months are zero-indexed, so January is 0
    const day = currentDate.getDate();
    const formattedDate = `${year}-${month}-${day}`;

    try {
      console.log(req.body);

      const { startDate, endDate, siteId } = req.body;

      const paymentExists = await Payment.findOne({
        date: { $gte: startDate, $lte: endDate },
        siteId: siteId,
      });

      console.log("date : ", startDate, endDate);

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
      console.log(employees);

      const returnList = [];

      const fetchPromises = employees.map(async (employee) => {
        let totalOvertime = 0;

        const attendances = await Attendance.find({
          date: { $gte: startDate, $lte: endDate },
          employeeId: employee._id,
        });

        attendances.map((attendance) => {
          console.log("Attendance : ", attendance);
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

          console.log("aaaaaaaa", attendances);
        });

        returnList.push({
          employeeId: employee._id,
          employeeName: employee.employeeName,
          totalOvertime,
          totalDays: attendances.length,
          overTimePay: totalOvertime * employee.otRate,
          netPay: employee.salary + totalOvertime * employee.otRate,
        });
      });

      const paymentsDetails = new payment({
        employeeId: "E#3232",
        employeeName: "Test",
        totalDays: 5,
        totalOverTime: 1,
        overTimePay: 1,
        netPay: 23444,
        payDate: formattedDate,
      });
      const re = await paymentsDetails.save();
      res.send(re);

      await Promise.all(fetchPromises);

      res.send(returnList);
      console.log(returnList);
    } catch (error) {
      console.log(error.message);
      if (error.name === "ValidationError") {
        next(createErrors(422, error.message));
        return;
      }
      next(error);
    }
  },

  getAllPaymentDetails: async (req, res, next) => {
    try {
      const result = await payment.find();
      res.send(result);
    } catch (error) {
      console.log(error.message);
    }
  },
};

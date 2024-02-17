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
      const { startDate, endDate, siteId } = req.body;

      const paymentExists = await payment.findOne({
        startDate: { $gte: startDate },
        endDate: { $lte: endDate },
        siteId: siteId,
      });

      console.log(paymentExists);

      if (paymentExists) {
        next(
          createErrors(
            422,
            "Payment record already exists for the given date range"
          )
        );
        return;
      }

      const paymentsDetails = new payment({
        startDate,
        endDate,
        siteId,
      });
      await paymentsDetails.save();
      res.send("Done");
    } catch (error) {
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

  getPaymentById: async (req, res, next) => {
    try {
      const result = await payment.findById(req.params.id);
      if (!result) {
        throw createErrors(404, "Payment does not exists");
      }

      console.log(result);
      const { startDate, endDate, siteId } = result;
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
          employeeName: employee.employeeName,
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
      if (error instanceof mongoose.CastError) {
        next(createErrors(400, "Invalid payment id"));
        return;
      }
      next(error);
    }
  },
};

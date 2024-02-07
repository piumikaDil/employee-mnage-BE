const createErrors = require("http-errors")
const mongoose = require("mongoose")


const Attendance = require("../Models/Atendance.models")

module.exports = {
    createAttendance: async (req, res, next) => {
        try {
            const attendance = new Attendance(req.body)
            const result = await attendance.save()
            res.send(result)
        } catch (error) {
            console.log(error.message);
            if (error.name === "ValidationError") {
                next(createErrors(422, error.message))
                return
            }
            next(error)
        }
    },

    
}
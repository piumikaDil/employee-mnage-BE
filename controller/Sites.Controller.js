const createErrors = require("http-errors")
const mongoose = require("mongoose")

const Employee = require("../Models/Sites.models")

module.exports = {
    createNewSite: async (req, res, next) => {
        try {
            const product = new Employee(req.body)
            const result = await product.save()
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

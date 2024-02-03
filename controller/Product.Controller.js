const createErrors = require("http-errors")
const mongoose = require("mongoose")


const Employee = require("../Models/Employee.models")

module.exports = {
    getAllEmployees: async (req, res, next) => {
        try {
            const result = await Employee.find()
            res.send(result)
        } catch (error) {
            console.log(error.message);
        }
    },

    createNewEmployee: async (req, res, next) => {
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

    deleteEmployee: async (req, res, next) => {
        try {
            const result = await Employee.findByIdAndDelete(req.params.id)

            if (!result) {
                throw createErrors(404, "Product does not exists")
            }
            res.send(result)
        } catch (error) {
            console.log(error.message);
            if (error instanceof mongoose.CastError) {
                next(createErrors(400, "Invalid product id"))
                return
            }
            next(error)
        }
    },

    updateEmployee: async (req, res, next) => {
        try {
            const id = req.params.id
            const updates = req.body
            const option = { new: true }

            const result = await Employee.findByIdAndUpdate(id, updates, option)
            if (!result) {
                throw createErrors(404, "Product does not exists")
            }
            res.send(result)
        } catch (error) {
            console.log(error.message);
            if (error instanceof mongoose.CastError) {
                next(createErrors(400, "Invalid product id"))
                return
            }
            next(error)
        }
    },

    getOneEmployee: async (req, res, next) => {
        try {
            console.log(req.params.key);
            // console.log(req.params.name);
            // const result = await Product.findOne({employeeName:req.params.name})
            // // const product = await Employee.findById(req.params.id)
            // if (!product) {
            //     throw createErrors(404, "Product does not exists")
            // }
            // console.log(product);
            // res.send(result)
        } catch (error) {
            console.log(error.message);
            if (error instanceof mongoose.CastError) {
                next(createErrors(400, "Invalid product id"))
                return
            }
            next(error)
        }

    }
}
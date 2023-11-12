const createErrors = require("http-errors")
const mongoose = require("mongoose")


const Product = require("../Models/Product.models")

module.exports = {
    getAllProducts: async (req, res, next) => {

        try {
            // const result = await Product.find({},{__v:0})
            const result = await Product.find()
            res.send(result)
        } catch (error) {
            console.log(error.message);
        }
    },

    createNewProduct: async (req, res, next) => {
        try {
            const product = new Product(req.body)
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

        // const product = new Product({
        //     name: req.body.name,
        //     price: req.body.price
        // })

        // product.save()
        //     .then(result => {
        //         console.log(result);
        //         res.send(result)
        //     })
        //     .catch(err => {
        //         console.log(err.message);
        //     })

    },

    deleteProduct: async (req, res, next) => {
        try {
            const result = await Product.findByIdAndDelete(req.params.id)

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

    updateProduct: async (req, res, next) => {
        try {
            const id = req.params.id
            const updates = req.body
            const option = { new: true }

            const result = await Product.findByIdAndUpdate(id, updates, option)
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

    getOneProduct: async (req, res, next) => {
        try {
            // const result = await Product.findOne({_id:req.params.id})
            const product = await Product.findById(req.params.id)
            if (!product) {
                throw createErrors(404, "Product does not exists")
            }
            console.log(product);
            res.send(result)
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
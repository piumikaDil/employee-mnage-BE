const createErrors = require("http-errors")
const mongoose = require("mongoose")

const Site = require("../Models/Sites.models")

module.exports = {
    createNewSite: async (req, res, next) => {
        try {
            const site = new Site(req.body)
            const result = await site.save()
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

    getAllESites: async (req, res, next) => {
        try {
            const result = await Site.find()
            res.send(result)
        } catch (error) {
            console.log(error.message);
        }
    },

    getOneSite: async (req, res, next) => {
        try {
            let result = await Site.find({
                "$or": [
                    { name: { $regex: req.params.key } }
                ]
            })
            if(!result) {
                throw createErrors(404, "Site does not exists")
            }
            res.send(result);
        } catch (error) {
            console.log(error.message);
            if (error instanceof mongoose.CastError) {
                next(createErrors(400, "Invalid site name"))
                return
            }
            next(error)
        }

    }

}

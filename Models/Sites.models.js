const mongoose = require('mongoose')
const Schema = mongoose.Schema

const siteSchema = new Schema({
    code: {
        type: String,
        requred: true
    },
    name: {
        type: String,
        requred: true
    },
    address:{
        type:String,
        requred:true
    },
    contactNo: {
        type: Number,
        requred: true
    }
})

const Sites = mongoose.model('site',siteSchema)
module.exports = Sites
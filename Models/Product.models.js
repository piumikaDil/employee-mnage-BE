const mongoose = require('mongoose')
const Schema = mongoose.Schema

const productSchema = new Schema({
    name: {
        type: String,
        requred: true
    },
    price:{
        type:Number,
        requred:true
    }
})

const Product = mongoose.model('product',productSchema)
module.exports = Product
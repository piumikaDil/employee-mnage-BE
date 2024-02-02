const mongoose = require('mongoose')
const Schema = mongoose.Schema

const employeeSchema = new Schema({
    employeeName: {
        type: String,
        requred: true
    },
    category:{
        type:String,
        requred:true
    },
    salary: {
        type: Number,
        requred: true
    },
    otRate: {
        type: Number,
    }
})

const Employee = mongoose.model('product',employeeSchema)
module.exports = Employee
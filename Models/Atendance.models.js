const mongoose = require('mongoose')
const Schema = mongoose.Schema

const employeeSchema = new Schema({
   id: {
        type: String,
        requred: true
    },
    employeeId: {
        type: String,
        requred: true
    },
    employeeName:{
        type:String,
        requred:true
    },
    inTime: {
        type: Date,
        requred: true
    },
    outTime: {
        type: Date,
        requred: true
    },
    date: {
        type: Date,
    },
})

const Employee = mongoose.model('product',employeeSchema)
module.exports = Employee
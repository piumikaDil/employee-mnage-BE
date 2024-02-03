const mongoose = require('mongoose')
const Schema = mongoose.Schema

const employeeSchema = new Schema({
    employeeID: {
        type: String,
        requred: true
    },
    employeeName: {
        type: String,
        requred: true
    },
    category:{
        type:String,
        // requred:true
    },
    salary: {
        type: Number,
        // requred: true
    },
    otRate: {
        type: Number,
    },
    site: {
        type: String,
    },
    nic: {
        type: String,
        requred: true
    }
})

const Employee = mongoose.model('product',employeeSchema)
module.exports = Employee
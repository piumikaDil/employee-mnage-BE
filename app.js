// import express, { json } from "express"; 
const express = require("express")
const createErrors = require("http-errors")
const dotenv = require("dotenv").config()
const cors = require("cors");
const app = express()

app.use(cors());

app.use(express.json())
app.use(express.urlencoded({extended:true}))

require("./initDB")()

const PORT = process.env.PORT || 3000;

const productRoute = require("./Routes/Product.route")
app.use("/employee", productRoute)

app.use((req, res, next) => {
    next(createErrors(404,"Not found"))
})

app.use((err, req, res, next) => {
    res.status(err.status || 500)
    res.send({
        error: {
            status: err.status || 500,
            message: err.message
        }
    })
})

app.listen(PORT, () => {
    console.log("I am listning "+PORT +"....");
})


// import express, { json } from "express"; 
const express = require("express")
const createErrors = require("http-errors")
const dotenv = require("dotenv").config()

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))

require("./initDB")()

const PORT = process.env.PORT || 3000;

// app.all("/test",(req,res)=>{
//     console.log(req.query)
//     res.send(req.query)
// })

// app.all("/test/:id", (req, res) => {
//     console.log(req.params)
//     res.send(req.params)
// })

// app.all("/test", (req, res) => {
//     console.log(req.body)
//     res.send(req.body)
// })

// app.all("/test", (req, res) => {
//     console.log(req.body)
//     res.send(req.body)
// })

const productRoute = require("./Routes/Product.route")
app.use("/products", productRoute)

app.use((req, res, next) => {
    // const err = new Error("Not found")
    // err.status = 404
    // next(err)
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


const express = require("express")
const router = express.Router()

const ProductController = require("../controller/Product.Controller")

router.get("/get", ProductController.getAllEmployees)
router.post("/save", ProductController.createNewEmployee)
router.delete("/:id", ProductController.deleteEmployee)
router.patch("/:id", ProductController.updateEmployee )
router.get("/:id",ProductController.getOneEmployee )

module.exports = router
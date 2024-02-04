const express = require("express")
const router = express.Router()

const ProductController = require("../controller/Product.Controller")

router.get("/", ProductController.getAllEmployees)
router.post("/", ProductController.createNewEmployee)
router.delete("/:id", ProductController.deleteEmployee)
router.put("/:id", ProductController.updateEmployee )
router.get("/:key",ProductController.getOneEmployee )

module.exports = router
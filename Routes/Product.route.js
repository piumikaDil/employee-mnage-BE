const express = require("express")
const router = express.Router()

const ProductController = require("../controller/Product.Controller")

router.get("/", ProductController.getAllProducts)
router.post("/", ProductController.createNewProduct)
router.delete("/:id", ProductController.deleteProduct)
router.patch("/:id", ProductController.updateProduct )
router.get("/:id",ProductController.getOneProduct )

module.exports = router
const express = require("express")
const router = express.Router()

const SiteController = require("../controller/Sites.Controller")

router.get("/", SiteController.getAllESites)
router.post("/", SiteController.createNewSite)
// router.delete("/:id", ProductController.deleteEmployee)
// router.put("/:id", ProductController.updateEmployee )
router.get("/:key",SiteController.getOneSite )

module.exports = router
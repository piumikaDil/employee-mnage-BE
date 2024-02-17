const express = require("express");
const router = express.Router();

const PaymentController = require("../controller/Payment.Controller");

router.post("/", PaymentController.createPayment);
router.get("/", PaymentController.getAllPaymentDetails);
router.get("/:id", PaymentController.getPaymentById);

module.exports = router;

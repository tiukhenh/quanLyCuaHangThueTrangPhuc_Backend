const express = require("express");
const bill = require("../controllers/bill.controller");
const router = express.Router();

router.route("/")
    .post(bill.createBill)
    .get(bill.findAllBill);



module.exports = router;

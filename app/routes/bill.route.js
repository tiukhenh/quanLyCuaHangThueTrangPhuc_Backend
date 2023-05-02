const express = require("express");
const bill = require("../controllers/bill.controller");
const router = express.Router();

router.route("/")
    .post(bill.createBill)
    .get(bill.findAllBill);
router.route("/:id")
    .get(bill.findOne)
    .put(bill.updateTinhTrang);
router.route("/:id/return")
    .put(bill.updateNgayTraHientai);



module.exports = router;

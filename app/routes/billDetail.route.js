const express = require("express");
const billDetail = require("../controllers/billDetail.controller");
const router = express.Router();

router.route("/")
    .get(billDetail.findAllBillDetail)
    .post(billDetail.createBillDetail);



module.exports = router;

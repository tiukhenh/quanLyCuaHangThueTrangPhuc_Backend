const express = require("express");
const type = require("../controllers/type.controller");

const router = express.Router();

router.route("/")
    .get(type.findAll)
    .post(type.create)

router.route("/:id")
    .get(type.findOne)


module.exports = router;

const express = require("express");
const item = require("../controllers/item.controller");

const router = express.Router();

router.route("/")
    .get(item.findAll)
    .post(item.create)

router.route("/:id")
    .get(item.findOne)
    .put(item.update)
    .delete(item.delete);
router.route("/tinhtrang/:id")
.put(item.updateTinhTrang);

module.exports = router;

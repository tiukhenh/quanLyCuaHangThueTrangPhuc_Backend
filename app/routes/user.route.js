const express = require("express");
const user = require("../controllers/user.controller");

const router = express.Router();

router.route("/")
    .post(user.createUser)
    .get(user.findAllUser);

router.route("/login")
    .post(user.login);
    
router.route("/logout")
    .post(user.logout);
    
router.route("/:id")
    .get(user.findOneUser)
    .put(user.updateUser)
    .delete(user.deleteUser);
module.exports = router;
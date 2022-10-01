var express = require("express");
var router = express.Router();
const userController = require("./../controllers/authController");

router.post("/register", userController.register);
router.post("/login", userController.login);
router.post("/refresh", userController.refresh);
router.post("/logout", userController.logout);

module.exports = router;

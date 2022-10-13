const router = require("express").Router();
const passportController = require("../controllers/passportController");
router.get("/", passportController.getAllUsers);

module.exports = router;

var express = require("express");
var router = express.Router();
const userController = require("./../controllers/userController");
const jwt = require("../public/middleware/jwt");

router.get("/", jwt.verifyToken, userController.getAllUsers);
// router.get("/", userController.getAllUsers);

router
  .route("/:id")
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(jwt.checkAdmin, userController.deleteUser);

module.exports = router;

var express = require("express");
var router = express.Router();

const itemController = require("./../controllers/itemController");
// router
//   .route("/")
//   .get(itemController.getAllBooks)
//   .post(itemController.createBook);

// router
//   .route("/:id")
//   .get(itemController.getBook)
//   .patch(itemController.updateBook)
//   .delete(itemController.deleteBook);

router.get("/", itemController.getAllItems);

module.exports = router;

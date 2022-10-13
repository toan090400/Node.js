var express = require("express");
var router = express.Router();

const aggregateController = require("./../controllers/aggregateController");
router
  .route("/")
  .get(aggregateController.getAll)
  .post(aggregateController.post);

// router
//   .route("/:id")
//   .get(bookController.getBook)
//   .patch(bookController.updateBook)
//   .delete(bookController.deleteBook);

module.exports = router;

var express = require("express");
var router = express.Router();

const categoryController = require("./../controllers/categoryController");

router
  .route("/")
  .get(categoryController.getAllCategorys)
  .post(categoryController.createCategory);
router
  .route("/:id")
  .get(categoryController.getCategory)
  .patch(categoryController.updateCategory)
  .delete(categoryController.deleteCategory);

module.exports = router;

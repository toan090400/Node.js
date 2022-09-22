var express = require("express");
var router = express.Router();
const imageController = require("./../controllers/imageController");

// thêm nhiều ảnh
router.post("/manyImage", imageController.postImageGoogles);
// xóa nhiều ảnh
router.delete("/:id", imageController.deleteImageGoogles);
// thêm 1 ảnh
router.post("/oneImage", imageController.postImageGoogle);
// xóa 1 ảnh
router.delete("/:id", imageController.deleteImageGoogle);

module.exports = router;

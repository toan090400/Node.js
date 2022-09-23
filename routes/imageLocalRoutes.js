var express = require("express");
var router = express.Router();
const imageController = require("./../controllers/imageController");

const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
let path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/image"); // nơi lưu ảnh
  },
  filename: function (req, file, cb) {
    cb(null, uuidv4() + "-" + Date.now() + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  const allowedFileTypes = ["image/jpeg", "image/jpg", "image/png"];
  if (allowedFileTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

let upload = multer({ storage, fileFilter });
// thêm nhiều ảnh
router.post(
  "/manyImage",
  upload.array("image"),
  imageController.postImageLocals
);
// xóa nhiều ảnh
router.delete("/manyImage/:id", imageController.deleteImageLocals);
// thêm 1 ảnh
router.post(
  "/oneImage",
  upload.single("image"),
  imageController.postImageLocal
);
// xóa 1 ảnh
router.delete("/oneImage/:id", imageController.deleteImageLocal);
module.exports = router;

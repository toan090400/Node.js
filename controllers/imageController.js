const Book = require("../models/bookModel");
// thêm nhiều ảnh google drive
exports.postImageGoogles = async (req, res) => {
  try {
    // const folder = await drive.files.create({
    //   requestBody: {
    //     name: req.body.name,
    //     mimeType: "application/vnd.google-apps.folder",
    //   },
    // });
    const images = req.files;
    images.forEach(async (i) => {
      const nameImages = i.originalname;
      const pathImages = i.path;
      const image = await drive.files.create({
        requestBody: {
          name: nameImages,
          mimeType: "image/jpg",
          // parents: [folder.data.id],
        },
        media: {
          mimeType: "image/jpg",
          body: fs.createReadStream(pathImages),
        },
      });
      const imageId = image.data.id;
      await drive.permissions.create({
        fileId: imageId,
        requestBody: {
          role: "reader",
          type: "anyone",
        },
      });
      await drive.files.get({
        fileId: imageId,
        fields: "webContentLink, webViewLink",
      });
    });
    const imageMany = req.files;
    const createBook = await new Book({
      image: imageMany,
    });
    await createBook.save();
    res.status(200).json({
      createBook,
      message: "Thêm mới thành công",
    });
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};
// xóa nhiều ảnh google
exports.deleteImageGoogles = async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    await drive.files.delete({
      fileId: book.image.id,
    });
    res.status(200).json({
      status: "Xóa thành công",
    });
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};
// thêm 1 google drive
exports.postImageGoogle = async (req, res) => {
  try {
    // const folder = await drive.files.create({
    //   requestBody: {
    //     name: req.body.name,
    //     mimeType: "application/vnd.google-apps.folder",
    //   },
    // });
    const image = await drive.files.create({
      requestBody: {
        name: req.file.originalname,
        mimeType: "image/jpg",
        // parents: ["1zljnspsnHgVtq1qBfZ_1adcTlQLMYfML"],
        // parents: [folder.data.id],
      },
      media: {
        mimeType: "image/jpg",
        body: fs.createReadStream(req.file.path),
      },
    });
    const imageId = image.data.id;
    await drive.permissions.create({
      fileId: imageId,
      requestBody: {
        role: "reader",
        type: "anyone",
      },
    });
    await drive.files.get({
      fileId: imageId,
      fields: "webContentLink, webViewLink",
    });
    const imageOne = req.file;
    const createBook = await new Book({
      image: imageOne,
    });
    await createBook.save();
    res.status(200).json({
      createBook,
      message: "Thêm mới thành công",
    });
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};
// xóa 1 ảnh google
exports.deleteImageGoogle = async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    await drive.files.delete({
      fileId: book.image.id,
    });
    res.status(200).json({
      status: "Xóa thành công",
    });
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};
// thêm nhiều ảnh local
exports.postImageLocals = async (req, res) => {
  try {
    console.log(req.files);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};
// xóa nhiều ảnh local
exports.deleteImageLocals = async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    const images = book.image;
    images.forEach((i) => {
      const deleteImages = i.filename;
      // địa chỉ lưu ảnh ../ui/public/assets/images
      fs.unlink(`../ui/public/assets/images/${deleteImages}`, (err) => {
        return console.log(err);
      });
    });
    res.status(200).json({
      status: "Xóa thành công",
    });
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};
// thêm 1 ảnh local
exports.postImageLocal = async (req, res) => {
  try {
    console.log(req.file);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};
// xóa 1 ảnh local
exports.deleteImageLocal = async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    // địa chỉ lưu ảnh ../ui/public/assets/image_book
    fs.unlink(`../ui/public/assets/image_book/${book.image}`, (err) => {
      return console.log(err);
    });
    res.status(200).json({
      status: "Xóa thành công",
    });
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};

const Book = require("../models/bookModel");
//
const fs = require("fs");
const googleApis = require("googleapis");
const oauth2Client = new googleApis.google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  process.env.REDIRECT_URI
);
oauth2Client.setCredentials({
  refresh_token: process.env.REFRESH_TOKEN,
});
const drive = googleApis.google.drive({
  version: "v3",
  auth: oauth2Client,
});
// thêm nhiều ảnh google drive
exports.postImageGoogles = async (req, res) => {
  try {
    const images = req.files;
    res.status(200).json({
      image: images,
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
    res.status(200).json({
      image: image.data,
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
    await drive.files.delete({
      fileId: req.params.id,
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
    // [
    //   {
    //     fieldname: 'image',
    //     originalname: '002-fix.jpg',
    //     encoding: '7bit',
    //     mimetype: 'image/jpeg',
    //     destination: './public/image',
    //     filename: 'e7f9a802-b48c-45e6-898a-fb08aa7984b6-1663917887693.jpg',
    //     path: 'public\\image\\e7f9a802-b48c-45e6-898a-fb08aa7984b6-1663917887693.jpg',
    //     size: 145768
    //   },
    //   {
    //     fieldname: 'image',
    //     originalname: '003-fix.jpg',
    //     encoding: '7bit',
    //     mimetype: 'image/jpeg',
    //     destination: './public/image',
    //     filename: '89869521-eaed-44af-9787-b4b37e592565-1663917887766.jpg',
    //     path: 'public\\image\\89869521-eaed-44af-9787-b4b37e592565-1663917887766.jpg',
    //     size: 216369
    //   }
    // ]
    res.status(200).json({
      image: req.files,
      message: "Thêm mới thành công",
    });
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};
// xóa nhiều ảnh local
exports.deleteImageLocals = async (req, res) => {
  try {
    // const book = await Book.findByIdAndDelete(req.params.id);
    const images = [
      {
        fieldname: "image",
        originalname: "002-fix.jpg",
        encoding: "7bit",
        mimetype: "image/jpeg",
        destination: "./public/image",
        filename: "e7f9a802-b48c-45e6-898a-fb08aa7984b6-1663917887693.jpg",
        path: "public\\image\\e7f9a802-b48c-45e6-898a-fb08aa7984b6-1663917887693.jpg",
        size: 145768,
      },
      {
        fieldname: "image",
        originalname: "003-fix.jpg",
        encoding: "7bit",
        mimetype: "image/jpeg",
        destination: "./public/image",
        filename: "89869521-eaed-44af-9787-b4b37e592565-1663917887766.jpg",
        path: "public\\image\\89869521-eaed-44af-9787-b4b37e592565-1663917887766.jpg",
        size: 216369,
      },
    ];
    images.forEach((item) => {
      const deleteImages = item.filename;
      // địa chỉ lưu ảnh ../ui/public/assets/images
      fs.unlink(`./public/image/${deleteImages}`, (err) => {
        return console.log(err);
      });
    });
    res.status(200).json({
      id: req.params.id,
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
    // {
    //   fieldname: 'image',
    //   originalname: '002-fix.jpg',
    //   encoding: '7bit',
    //   mimetype: 'image/jpeg',
    //   destination: './public/image',
    //   filename: 'ae85e3b7-04f4-4a78-a0e6-cd5ef135ff68-1663917092629.jpg',
    //   path: 'public\\image\\ae85e3b7-04f4-4a78-a0e6-cd5ef135ff68-1663917092629.jpg',
    //   size: 145768
    // }
    res.status(200).json({
      image: req.file,
      message: "Thêm mới thành công",
    });
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};
// xóa 1 ảnh local
exports.deleteImageLocal = async (req, res) => {
  try {
    // const book = await Book.findByIdAndDelete(req.params.id);
    // book.image
    // filename: 'ae85e3b7-04f4-4a78-a0e6-cd5ef135ff68-1663917092629.jpg',
    // địa chỉ lưu ảnh ../ui/public/assets/image_book
    fs.unlink(`./public/image/${book.image}`, (err) => {
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

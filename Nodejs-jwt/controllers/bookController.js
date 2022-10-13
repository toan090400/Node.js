const Book = require("../models/bookModel");

exports.getAllBooks = async (req, res) => {
  try {
    const books = await Book.find();

    res.status(200).json(books);
  } catch (error) {
    res.status(400).json(error);
  }
};
exports.getBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id)
      .populate({
        path: "category",
        select: "-__v",
      })
      .populate({
        path: "user",
        select: "-__v",
      });

    res.status(200).json(book);
  } catch (error) {
    res.status(400).json(error);
  }
};
exports.createBook = async (req, res) => {
  try {
    // --- create cách 1 ---
    // const newBook = await new Book({
    //   name: req.body.name,
    //   description: req.body.description,
    // });
    // await newBook.save();
    // --- create cách 2 ---
    const newBook = await Book.create(req.body);
    res.status(200).json({
      newBook,
      message: "Thêm mới thành công",
    });
  } catch (error) {
    res.status(400).json(error);
  }
};
exports.updateBook = async (req, res) => {
  try {
    // --- update cách 1 ---
    // const newBook = await Book.findById(req.params.id);
    // newBook.name = req.body.name;
    // newBook.description = req.body.description;
    // await newBook.save();
    // --- update cách 2 ---
    const newBook = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      newBook,
      message: "Cập nhập thành công!",
    });
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};
exports.deleteBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);

    res.status(200).json({
      status: "Xóa thành công",
    });
  } catch (error) {
    res.status(400).json(error);
  }
};

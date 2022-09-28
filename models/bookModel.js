const mongoose = require("mongoose");
const BookSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
    },

    difficulty: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    image: {
      type: String,
    },
    category: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "categorys",
      },
    ],
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "users",
    },
  },
  { timestamps: true }
);

const Book = (module.exports = mongoose.model("books", BookSchema));

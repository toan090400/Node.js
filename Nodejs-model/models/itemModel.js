const mongoose = require("mongoose");
const ItemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
    },
    image: {
      type: String,
    },
    image: [
      {
        filename: { type: String },
        size: { type: Number },
      },
    ],
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

const Item = (module.exports = mongoose.model("items", ItemSchema));

const mongoose = require("mongoose");
const CategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "users",
    },
  },
  { timestamps: true }
);

const Category = (module.exports = mongoose.model("categorys", CategorySchema));

const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      trim: true,
    },
    password: {
      type: String,
      select: false, // select khi lay database thi khong hien thi password
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const User = (module.exports = mongoose.model("users", UserSchema));

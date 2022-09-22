const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.login = async (req, res) => {
  try {
    res.status(200).json({
      user: req.body,
      message: "Thêm mới thành công",
    });
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};

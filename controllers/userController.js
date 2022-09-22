const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();

    res.status(200).json({ users });
  } catch (error) {
    res.status(400).json(error);
  }
};
exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    res.status(200).json({ user });
  } catch (error) {
    res.status(400).json(error);
  }
};
exports.updateUser = async (req, res) => {
  try {
    const newUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({ newUser });
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};
exports.deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({
      status: "success",
    });
  } catch (error) {
    res.status(400).json(error);
  }
};
exports.createUser = async (req, res) => {
  try {
    // const user = await User.create(req.body);
    res.status(200).json({
      user: req.body,
      message: "Thêm mới thành công",
    });
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};

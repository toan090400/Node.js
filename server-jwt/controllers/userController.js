const User = require("../models/userModel");

exports.getAllUsers = async (req, res) => {
  try {
    // console.log(req.user);
    const users = await User.find();

    res.status(200).json({ users });
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};
exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    res.status(200).json({ user });
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};
exports.updateUser = async (req, res) => {
  try {
    const newUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      newUser,
      message: "Cập nhập thành công.",
    });
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};
exports.deleteUser = async (req, res) => {
  try {
    // await User.findByIdAndDelete(req.params.id);
    await User.findById(req.params.id);
    res.status(200).json({
      message: "Xóa thành công.",
    });
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};

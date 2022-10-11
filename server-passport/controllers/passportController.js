const User = require("../models/passportModel");

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();

    res.status(200).json({ users });
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};

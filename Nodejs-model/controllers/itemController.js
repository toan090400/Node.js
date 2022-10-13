const Item = require("../models/itemModel");

exports.getAllItems = async (req, res) => {
  try {
    const items = await Item.find();

    res.status(200).json({ items });
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};

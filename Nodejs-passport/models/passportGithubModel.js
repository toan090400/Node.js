const mongoose = require("mongoose");
const PassportSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      trim: true,
    },
    nodeId: {
      type: String,
      trim: true,
    },
    username: {
      type: String,
      trim: true,
    },
    profileUrl: {
      type: String,
      trim: true,
    },
    image: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

const Passport = (module.exports = mongoose.model(
  "passportgithubs",
  PassportSchema
));

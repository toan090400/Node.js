const mongoose = require("mongoose");
const PassportSchema = new mongoose.Schema(
  {
    googleId: {
      type: String,
      trim: true,
    },
    displayName: {
      type: String,
      trim: true,
    },
    familyName: {
      type: String,
      trim: true,
    },
    givenName: {
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

const Passport = (module.exports = mongoose.model("passports", PassportSchema));

const mongoose = require("mongoose");
const AggregateSchema = new mongoose.Schema(
  {
    pay: {
      type: Number,
      trim: true,
    },
    books: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "books",
      },
    ],
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "users",
    },
  },
  { timestamps: true }
);

const Aggregate = (module.exports = mongoose.model(
  "aggregates",
  AggregateSchema
));

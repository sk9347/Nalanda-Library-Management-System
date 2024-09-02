// src/models/book.model.js
const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const BookSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: uuidv4,
  },
  title: { type: String, required: true },
  author: { type: String, required: true },
  isbn: { type: String, required: true, unique: true },
  publicationDate: { type: Date, required: true },
  genre: { type: String, required: true },
  numberOfCopies: { type: Number, required: true },
  originalCopiesCount: { type: Number, default: 0 },
  borrowedCount: { type: Number, default: 0 },
});

BookSchema.pre("save", function (next) {
  if (!this._id) {
    this._id = uuidv4();
  }
  this.originalCopiesCount = this.originalCopiesCount
    ? this.originalCopiesCount
    : this.numberOfCopies;
  next();
});

module.exports = mongoose.model("Book", BookSchema);

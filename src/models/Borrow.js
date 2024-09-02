const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");
const BorrowSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: uuidv4,
  },
  userId: { type: String, ref: "User", required: true },
  bookId: { type: String, ref: "Book", required: true },
  borrowDate: { type: Date, default: new Date() },
  returnDate: { type: Date, default: null },
});

BorrowSchema.pre("save", function (next) {
  if (!this._id) {
    this._id = uuidv4();
  }
  next();
});

module.exports = mongoose.model("Borrow", BorrowSchema);

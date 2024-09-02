const Borrow = require("../models/Borrow");
const Book = require("../models/Book");

class BorrowService {
  async borrowBook(userId, bookId) {
    const book = await Book.findById(bookId);
    if (book.numberOfCopies > 0) {
      book.numberOfCopies--;
      book.borrowedCount++;
      await book.save();

      const borrow = new Borrow({ userId, bookId });
      return await borrow.save();
    } else {
      throw new Error("Book not available");
    }
  }

  async returnBook(borrowId) {
    const borrow = await Borrow.findById(borrowId);
    if (!borrow) {
      throw new Error("Borrow record not found");
    }

    const book = await Book.findById(borrow.bookId);
    book.numberOfCopies++;
    await book.save();

    borrow.returnDate = new Date();
    return await borrow.save();
  }

  async getBorrowHistory(userId) {
    return await Borrow.find({ userId: userId });
  }

  async mostBorrowedBooks() {
    return await Book.find().sort({ borrowedCount: -1 }).limit(10);
  }

  async activeMembers() {
    const borrows = await Borrow.aggregate([
      { $group: { _id: "$userId", borrowCount: { $sum: 1 } } },
      { $sort: { borrowCount: -1 } },
      { $limit: 10 },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "userDetails",
        },
      },
      { $unwind: "$userDetails" },
      {
        $project: {
          userId: "$_id",
          borrowCount: 1,
          "userDetails.name": 1,
          "userDetails.email": 1,
        },
      },
    ]);
    return borrows;
  }
}

module.exports = new BorrowService();

const Book = require("../models/Book");
const CustomError = require("../utils/costomError");

class BookService {
  async getBooks({ genre, author, title, page, limit }) {
    try {
      const query = {};
      if (genre) query.genre = genre;
      if (author) query.author = author;
      if (title) query.title = title;

      const books = await Book.find(query)
        .skip((page - 1) * limit)
        .limit(limit);
      return books;
    } catch (error) {
      console.error("Error fetching books:", error);
      throw new CustomError("Error fetching books", 500);
    }
  }

  async getBookById(id) {
    try {
      const book = await Book.findById(id);
      if (!book) {
        throw new CustomError("Book not found", 404);
      }
      return book;
    } catch (error) {
      throw new CustomError("Error fetching the book", error.code || 500);
    }
  }

  async addBook(bookData) {
    try {
      const newBook = new Book(bookData);
      return await newBook.save();
    } catch (error) {
      throw new CustomError("Error occurred while adding the book", 500);
    }
  }

  async updateBook(id, bookData) {
    try {
      const updatedBook = await Book.findByIdAndUpdate(id, bookData, {
        new: true,
      });
      if (!updatedBook) {
        throw new CustomError("Book not found", 404);
      }
      return updatedBook;
    } catch (error) {
      throw new CustomError("Error occurred while updating the book", 500);
    }
  }

  async deleteBook(id) {
    try {
      const deletedBook = await Book.findByIdAndDelete(id);
      if (!deletedBook) {
        throw new CustomError("Book not found", 404);
      }
      return true;
    } catch (error) {
      throw new CustomError("Error occurred while deleting the book", 500);
    }
  }

  async bookAvailability() {
    const borrowedBooks = await Book.aggregate([
      {
        $group: {
          _id: null,
          totalBooks: { $sum: "$originalCopiesCount" },
          totalBorrowedCount: {
            $sum: { $subtract: ["$originalCopiesCount", "$numberOfCopies"] },
          },
        },
      },
    ]);
    console.log(borrowedBooks);
    const books =
      borrowedBooks.length > 0
        ? borrowedBooks[0]
        : { totalBooks: 0, totalBorrowedCount: 0 };

    return {
      totalBooks: books.totalBooks,
      borrowedBooks: books.totalBorrowedCount,
      availableBooks: books.totalBooks - books.totalBorrowedCount,
    };
  }
}

module.exports = new BookService();

const bookService = require("../services/book.service");
const CustomError = require("../../utils/costomError");

const resolvers = {
  Query: {
    getBooks: async (_, { genre, author, title, page = 1, limit = 10 }) => {
      try {
        const pageNumber = page > 0 ? page : 1;
        const limitNumber = limit > 0 ? limit : 10;
        return await bookService.getBooks({
          genre,
          author,
          title,
          page: pageNumber,
          limit: limitNumber,
        });
      } catch (error) {
        throw new CustomError(error.message, error.code || 500);
      }
    },
    getBookById: async (_, { id }) => {
      try {
        return await bookService.getBookById(id);
      } catch (error) {
        throw new CustomError(error.message, error.code || 500);
      }
    },
    bookAvailability: async () => {
      return await bookService.bookAvailability();
    },
  },
  Mutation: {
    addBook: async (_, { input }, context) => {
      try {
        const user = context.user;
        if (user.role !== "Admin") {
          throw new CustomError("User is not authorized to add a book", 403);
        }

        return await bookService.addBook(input, user);
      } catch (error) {
        throw new CustomError(error.message, error.code || 500);
      }
    },
    updateBook: async (_, { id, input }, context) => {
      try {
        const user = context.user;

        if (user.role !== "Admin") {
          throw new CustomError("User is not authorized to update a book", 403);
        }

        return await bookService.updateBook(id, input);
      } catch (error) {
        throw new CustomError(error.message, error.code || 500);
      }
    },
    deleteBook: async (_, { id }, context) => {
      try {
        const user = context.user;

        if (user.role !== "Admin") {
          throw new CustomError("User is not authorized to delete a book", 403);
        }

        return await bookService.deleteBook(id);
      } catch (error) {
        throw new CustomError(error.message, error.code || 500);
      }
    },
  },
};

module.exports = resolvers;

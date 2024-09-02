const borrowService = require("../services/borrow.service");

const resolvers = {
  Query: {
    getBorrowHistory: async (_, { userId }) => {
      return await borrowService.getBorrowHistory(userId);
    },
    mostBorrowedBooks: async () => {
      return await borrowService.mostBorrowedBooks();
    },
    activeMembers: async () => {
      return await borrowService.activeMembers();
    },
  },
  Mutation: {
    borrowBook: async (_, { userId, bookId }) => {
      return await borrowService.borrowBook(userId, bookId);
    },
    returnBook: async (_, { id }) => {
      return await borrowService.returnBook(id);
    },
  },
};

module.exports = resolvers;

const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Book {
    id: ID!
    title: String!
    author: String!
    isbn: String!
    publicationDate: String!
    genre: String!
    numberOfCopies: Int!
    borrowedCount: Int!
  }

  type AvailableBooks {
    totalBooks: Int
    borrowedBooks: Int
    availableBooks: Int
  }

  input BookInput {
    title: String!
    author: String!
    isbn: String!
    publicationDate: String!
    genre: String!
    numberOfCopies: Int!
  }

  input UpdateBookInput {
    title: String
    author: String
    isbn: String
    publicationDate: String
    genre: String
    numberOfCopies: Int
  }

  type Query {
    getBooks(genre: String, author: String, page: Int, limit: Int): [Book]
    getBookById(id: ID!): Book
    bookAvailability: AvailableBooks
  }

  type Mutation {
    addBook(input: BookInput!): Book
    updateBook(id: ID!, input: UpdateBookInput!): Book
    deleteBook(id: ID!): Boolean
  }
`;

module.exports = typeDefs;

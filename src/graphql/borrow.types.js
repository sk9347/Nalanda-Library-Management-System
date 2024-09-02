const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Borrow {
    id: ID!
    userId: ID!
    bookId: ID!
    borrowDate: String!
    returnDate: String
  }
  type UserDetails {
    name: String!
    email: String!
  }

  type ActiveMember {
    userId: ID!
    borrowCount: Int!
    userDetails: UserDetails!
  }

  type Query {
    getBorrowHistory(userId: ID!): [Borrow]
    mostBorrowedBooks: [Book]
    activeMembers:[ActiveMember]
  }

  type Mutation {
    borrowBook(userId: ID!, bookId: ID!): Borrow
    returnBook(id: ID!): Borrow
  }
`;

module.exports = typeDefs;
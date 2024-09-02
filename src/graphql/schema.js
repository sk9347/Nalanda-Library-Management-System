const { makeExecutableSchema } = require('@graphql-tools/schema');
const { mergeTypeDefs, mergeResolvers } = require('@graphql-tools/merge');

// Import your GraphQL type definitions and resolvers
const bookTypeDefs = require('./book.types');
const borrowTypeDefs = require('./borrow.types');
const bookResolvers = require('../resolvers/book.resolver');
const borrowResolvers = require('../resolvers/borrow.resolver');

// Combine all type definitions and resolvers
const typeDefs = mergeTypeDefs([bookTypeDefs,borrowTypeDefs]);
const resolvers = mergeResolvers([bookResolvers,borrowResolvers]);

// Create and export the executable schema
module.exports = makeExecutableSchema({ typeDefs, resolvers });

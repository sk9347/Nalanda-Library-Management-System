const { makeExecutableSchema } = require('@graphql-tools/schema');
const { mergeTypeDefs, mergeResolvers } = require('@graphql-tools/merge');


const bookTypeDefs = require('./book.types');
const borrowTypeDefs = require('./borrow.types');
const bookResolvers = require('../resolvers/book.resolver');
const borrowResolvers = require('../resolvers/borrow.resolver');


const typeDefs = mergeTypeDefs([bookTypeDefs,borrowTypeDefs]);
const resolvers = mergeResolvers([bookResolvers,borrowResolvers]);


module.exports = makeExecutableSchema({ typeDefs, resolvers });

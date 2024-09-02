const express = require("express");
const dotenv = require('dotenv');
const { connectDB } = require('./db/db');
const router = require("./routes/authRoutes");
const { ApolloServer } = require("apollo-server-express");
const schema = require("./graphql/schema");
const verifyToken = require("./middlewares/auth.midlleware");

dotenv.config();

const app = express();
app.use(express.json());

connectDB();

app.use('/auth', router);


async function startServer() {
  const server = new ApolloServer({
    schema,
    context: ({ req }) => {
    const authHeader = req.headers.authorization;
    try {
        const user = verifyToken(authHeader); 
        return { user, req };
      } catch (err) {
        throw new Error('Authentication required to access this GraphQL API');
      }
    }
  });
  await server.start(); // Ensure the server is started before applying middleware
  server.applyMiddleware({ app, path: '/graphql' });
}

startServer().then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`Running a GraphQL API server at http://localhost:${process.env.PORT}/graphql`);
  });
}).catch(error => {
  console.error('Error starting the server:', error);
});

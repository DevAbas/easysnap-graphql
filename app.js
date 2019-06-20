const express = require('express');
const mongoose = require('mongoose');
const { ApolloServer } = require('apollo-server-express');
const { importSchema } = require('graphql-import');
// Config env variables by dotenv
require('dotenv').config();

// Models
const User = require('./models/User');

const resolvers = require('./graphql/resolvers');

const server = new ApolloServer({
  typeDefs: importSchema('./graphql/schema.graphql'),
  resolvers,
  context: {
    User,
  },
});

// Connection to MongoDB
mongoose
  .connect(process.env.DB_URI, { useNewUrlParser: true, useCreateIndex: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log(err));

const app = express();
server.applyMiddleware({ app });

app.listen({ port: 4001 }, () =>
  console.log(`Server ready at http://localhost:4001${server.graphqlPath}`)
);

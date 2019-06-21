const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const { ApolloServer } = require('apollo-server-express');
const { importSchema } = require('graphql-import');
// Config env variables by dotenv
require('dotenv').config();

// Models
const User = require('./models/User');
const Snap = require('./models/Snap');

const resolvers = require('./graphql/resolvers');

const server = new ApolloServer({
  typeDefs: importSchema('./graphql/schema.graphql'),
  resolvers,
  context: ({ req }) => ({
    User,
    Snap,
    activeUser: req.activeUser,
  }),
});

// Connection to MongoDB
mongoose
  .connect(process.env.DB_URI, { useNewUrlParser: true, useCreateIndex: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log(err));

const app = express();

app.use(async (req, res, next) => {
  const token = req.headers['authorization'];

  if (token && token !== 'null') {
    try {
      const activeUser = await jwt.verify(token, process.env.SECRET_KEY);
      req.activeUser = activeUser;
      console.log(activeUser);
    } catch (e) {
      console.log(e);
    }
  }

  next();
});

server.applyMiddleware({ app });

app.listen({ port: 4001 }, () =>
  console.log(`Server ready at http://localhost:4001${server.graphqlPath}`)
);

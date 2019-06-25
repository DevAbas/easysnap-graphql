// Query resolvers
const Query = require('./queries/Query');
const Snap = require('./queries/Snap');
const User = require('./queries/User');

// Mutation resolvers
const Mutation = require('./mutations');

// Subscription resolvers
const Subscription = require('./subscriptions');

module.exports = {
  Query,
  Mutation,
  Snap,
  User,
  Subscription,
};

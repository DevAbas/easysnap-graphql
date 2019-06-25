module.exports = {
  user: {
    subscribe: (parent, args, { pubsub }) =>
      pubsub.asyncIterator('user created'),
  },
};

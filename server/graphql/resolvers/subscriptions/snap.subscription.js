const { withFilter } = require('apollo-server');

module.exports = {
  snap: {
    subscribe: withFilter(
      (parent, args, { pubsub }) => pubsub.asyncIterator('snap added'),
      (payload, variables) =>
        variables.userId
          ? String(payload.snap.user_id) === variables.userId
          : true
    ),
  },
};

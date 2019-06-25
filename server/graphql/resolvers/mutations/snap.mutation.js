module.exports = {
  createSnap: async (parent, { data: { text, user_id } }, { Snap, pubsub }) => {
    try {
      const newSnap = await new Snap({
        text,
        user_id,
      }).save();
      pubsub.publish('snap added', {
        snap: newSnap,
      });
      return newSnap;
    } catch (e) {
      throw new Error(e);
    }
  },
};

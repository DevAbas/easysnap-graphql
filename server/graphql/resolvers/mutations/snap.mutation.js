module.exports = {
  createSnap: async (parent, { data: { text, user_id } }, { Snap, pubsub }) => {
    try {
      const newSnap = await new Snap({
        text,
        user_id,
      });
      pubsub.publish('snap added', {
        snap: newSnap,
      });
      return newSnap.save();
    } catch (e) {
      throw new Error(e);
    }
  },
};

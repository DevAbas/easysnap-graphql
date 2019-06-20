module.exports = {
  createSnap: async (parent, { data: { user_id, text } }, { Snap }) => {
    const newSnap = await new Snap({
      user_id,
      text,
    });

    return newSnap.save();
  },
};

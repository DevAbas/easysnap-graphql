module.exports = {
  createSnap: async (parent, { data: { text, user_id } }, { Snap }) => {
    const newSnap = await new Snap({
      text,
      user_id,
    });

    return newSnap.save();
  },
};

module.exports = {
  createUser: async (parent, { data: { username, password } }, { User }) => {
    const user = await User.findOne({ username });

    if (user) {
      throw new Error('User already exists');
    }

    const newUser = await new User({
      username,
      password,
    });

    return newUser.save();
  },
};

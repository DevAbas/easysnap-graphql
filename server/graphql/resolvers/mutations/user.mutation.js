const bcrypt = require('bcrypt');
const token = require('../../../helpers/token');

module.exports = {
  createUser: async (parent, { data: { username, password } }, { User }) => {
    const user = await User.findOne({ username });

    // If user is already exists return error message
    if (user) {
      throw new Error('User already exists');
    }

    const newUser = await new User({
      username,
      password,
    }).save();

    return { token: token.generate(newUser, '1hr') };
  },

  signInUser: async (parent, { data: { username, password } }, { User }) => {
    const user = await User.findOne({ username });

    // If user does not exists send error message to UI
    if (!user) {
      throw new Error('User does not exists');
    }

    // To check matching between the password that came from the input and the password that exists.
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      throw new Error('Password is not correct');
    }
    return {
      token: token.generate(user, '1h'),
    };
  },
};

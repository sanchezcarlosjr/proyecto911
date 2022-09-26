import models from "../models";
const hasher = require("pbkdf2-password")();

export default {
  createUser: async (email, password) => {
    hasher(password, async (err, pass, salt, hash) => {
      const user = new models.User({
        email,
        salt,
        hash,
      });
      await user.save();
      return user;
    });
  },

  getUser: async (email) => {
    const user = await models.User.findByEmail(email);
    return user;
  },
};

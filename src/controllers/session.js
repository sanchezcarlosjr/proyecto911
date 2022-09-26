import models from "../models";
import { jwtSecret, jwtAlgorithm } from "../config";
const hasher = require("pbkdf2-password")();

export default {
  getToken: async (email, password) => {
    const user = await models.User.findByEmail(email);
    hasher(password, async (err, pass, salt, hash) => {
      if (hash === user.hash) {
        jwt.sign(
          { user: user.email },
          jwtSecret,
          { algorithm: jwtAlgorithm },
          (err, token) => {
            return token;
          }
        );
      }
    });
  },
};

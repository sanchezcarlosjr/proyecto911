import models from "../../src/models";
const hasher = require("pbkdf2-password")();
import jwt from 'jsonwebtoken';

export default {
  getToken: async (email: string, password: string) => {
    const user = await models.User.findByEmail(email) as any;
    hasher(password, async (err: any, pass: any, salt: any, hash: any) => {
      if (hash !== user.hash) {
        throw new Error("invalid password");
      }
      jwt.sign(
          { user: user.email }, 
          process.env.JWT_SECRET || "secret", 
          { 
            expiresIn: '1h'
          },
          (err, token) => {
            return token;
          }
        );
    });
  },
};

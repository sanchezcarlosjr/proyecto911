import User from "../models/user";
const hasher = require("pbkdf2-password")();

export default {
  createUser: async (email: string, password: string) => {
    hasher({
      password
    }, async (err: any, pass: any, salt: any, hash: any) => {
      const user = new User({
        email,
        salt,
        hash,
      });
      await user.save();
      return user;
    });
  },
  getUser: async (email: string) => {
    const user = await (User as any).findByEmail(email);
    return user;
  },
};

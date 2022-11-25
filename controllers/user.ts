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
  deleteUser: async (id: string) => {
    const user = await User.findById(id);
    await user.remove();
    return user;
  },
  getRole: async (email: string) => {
    const user = await (User as any).findByEmail(email);
    return user.role;
  },
  addRole: async (email: string, role: string) => {
    const user = await (User as any).findByEmail(email);
    user.role = role;
    await user.save();
    return user;
  },
  removeRole: async (email: string) => {
    const user = await (User as any).findByEmail(email);
    user.role = null;
    await user.save();
    return user;
  },
};

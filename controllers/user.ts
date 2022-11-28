import User from "../models/user";
import Role from "../models/role";
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
    const user = await User.findByEmail(email);
    return user;
  },
  deleteUser: async (id: string) => {
    const user = await User.findById(id);
    await user?.remove();
    return user;
  },
  getRole: async (email: string) => {
    const user = await User.findByEmail(email);
    return user.role;
  },
  addRole: async (email: string, roleName: string) => {
    const user = await User.findByEmail(email);
    const role = await Role.findByName(roleName);
    user.role = role._id;
    await user.save();
    return user;
  },
  removeRole: async (email: string) => {
    const user = await User.findByEmail(email);
    user.update({ $unset: { role: 1 } });
    await user.save();
    return user;
  },
};

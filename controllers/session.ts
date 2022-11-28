import User from "../models/user";
import {sign} from "../lib/sign";

const hasher = require("pbkdf2-password")();

export default {
  getToken: async (email: string, password: string) => {
      const user = await User.findByEmail(email);
      return await hasher(password, async (err: any, pass: any, salt: any, hash: any) => {
        if (hash !== user.hash) {
          throw new Error("invalid password");
        }
        return await sign({email});
    }) as string;
  }
};

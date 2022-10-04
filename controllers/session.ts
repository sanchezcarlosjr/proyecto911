import User from "../models/user";
const hasher = require("pbkdf2-password")();
import jwt from 'jsonwebtoken';

const sign = (body: Object) => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      body,
      process.env.JWT_SECRET || "secret",
      {
        expiresIn: '1h'
      },
      (err, token) => {
         resolve(token); 
      }
    );
  });
}

export default {
  getToken: async (email: string, password: string) => {
      const user = await (User as any).findByEmail(email) as any;
      return await hasher(password, async (err: any, pass: any, salt: any, hash: any) => {
        if (hash !== user.hash) {
          throw new Error("invalid password");
        }
        return await sign({email});
    }) as string;
  }
};

import User from "../models/user";
import jwt from "jsonwebtoken";

const sign = (body: Object) => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      body,
      process.env.JWT_SECRET || "secret",
      {
        expiresIn: "1h",
      },
      (err, token) => {
        resolve(token);
      }
    );
  });
};

export default {
  getToken: async (email: string, password: string) => {
    const formData = new URLSearchParams() as any;
    formData.append("json", JSON.stringify({ usuario: process.env.API_USERNAME, contrasena: process.env.API_PASSWORD }));
    const res = await fetch(`${process.env.API_URL}/escolar/alumno/auth`, {
      method: "POST",
      headers: {
        "Authorization": `Basic ${Buffer.from(`${process.env.API_USERNAME}:${process.env.API_PASSWORD}`).toString("base64")}`,
      },
      body: formData,
    });
    const data = await res.text();
    if (data === "false") {
      throw new Error("false from api");
    }
    return await sign({ email }) as string;
  },
};

import jwt from "jsonwebtoken";

export const sign = (body: Object) => {
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
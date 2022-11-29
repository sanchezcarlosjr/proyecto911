import type { NextApiRequest, NextApiResponse } from 'next'
import jwt from "jsonwebtoken";

interface PermissionResponse {
    status: string;
}

interface ErrorResponse {
    message: string;
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<PermissionResponse | ErrorResponse>
) {
    try {
        switch (req.method) {
            case 'GET':
                jwt.verify(req.query.token as string, process.env.JWT_SECRET || "secret");
                return res.status(200).send({ status: "ra.notification.welcome" });
            default:
                return res.status(406).json({ message: 'ra.notification.http_error' });
        }
    } catch (error) {
        console.warn(new Date(), error);
        return res.status(401).json({ message: "ra.auth.auth_check_error" });
    }
}

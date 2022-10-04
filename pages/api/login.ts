import type { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from '../../lib/ dbConnect';
import sessionController from "../../controllers/session";

interface LoginResponse {
    token: string;
}

interface ErrorResponse {
    error: string;
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<LoginResponse | ErrorResponse>
) {
    try {
        switch (req.method) {
            case 'POST':
                await dbConnect();
                const token = await sessionController.getToken(req.body.email, req.body.password);
                return res.status(401).json({ token });
            default:
                throw new Error('Method not allowed');
        }
    } catch (error) {
        return res.status(500).json({ "error": (error as any).message });
    }
}

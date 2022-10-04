import type { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from '../../../lib/ dbConnect';

interface PermissionResponse {
    token: string;
}

interface ErrorResponse {
    error: string;
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<PermissionResponse | ErrorResponse>
) {
    try {
        switch (req.method) {
            case 'GET':
                await dbConnect();
                return res.status(200).send({ token: req.query.token as string});
            default:
                return res.status(500).json({ error: 'Method not allowed' });
        }
    } catch (error) {
        return res.status(500).json({ "error": (error as any).message });
    }
}

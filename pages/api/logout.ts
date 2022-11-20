import type { NextApiRequest, NextApiResponse } from 'next'


interface LogoutResponse {
    response: string
}

interface ErrorResponse {
    error: string;
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<LogoutResponse | ErrorResponse>
) {
    try {
        switch (req.method) {
            case 'DELETE':
                return res.status(401).json({response: "logout"});
            default:
                throw new Error('Method not allowed');
        }
    } catch (error) {
        return res.status(500).json({ "error": (error as any).message });
    }
}

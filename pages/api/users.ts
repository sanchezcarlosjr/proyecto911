import type { NextApiRequest, NextApiResponse } from 'next'

interface ErrorResponse {
    error: string;
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any[] | ErrorResponse>
) {
    try {
        switch (req.method) {
            case 'GET':
                const collection = [
                    { "id": 126, "nombre": "allo?", "correo": "uabc", "unidad_id": 1, "campus": "A", "rol": "A"  },
                    { "id": 127, "nombre": "allo?", "correo": "uabc", "unidad_id": 2, "campus": "A", "rol": "A"  },
                    { "id": 128, "nombre": "allo?", "correo": "uabc", "unidad_id": 3, "campus": "A", "rol": "A"  },
                    { "id": 129, "nombre": "allo?", "correo": "uabc", "unidad_id": 4, "campus": "A", "rol": "A"  }
                ];
                const total = 27;
                return res.status(200).setHeader('Content-Range', `0-${collection.length}/${total}`).json(collection);
            default:
                throw new Error('Method not allowed');
        }
    } catch (error) {
        return res.status(500).json({ "error": (error as any).message });
    }
}

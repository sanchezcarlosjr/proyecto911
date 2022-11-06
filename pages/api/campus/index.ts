import type {NextApiRequest, NextApiResponse} from 'next'
import dbConnect from "../../../lib/ dbConnect";

interface ErrorResponse {
    error: string;
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any[] | ErrorResponse>
) {
    try {
        await dbConnect();
        switch (req.method) {
            case 'GET':
                const response = await fetch(`${process.env.API}/escolar/catalogos/campus`, {
                    headers: {
                        'Authorization': process.env.API_AUTHORIZATION ?? ""
                    }
                }).then(response => response.json());
                let campus = response['campus'].map((campus: { idCampus: string, nombreCampus: string }) => (
                    {
                        id: campus['idCampus'],
                        nombre: campus['nombreCampus']
                    }
                ));
                const id = req.query.filter === undefined ? "" : JSON.parse(req.query.filter as string)['id'];
                if (id) {
                    campus = campus.filter((campus: {id: number}) => campus.id === id[0]);
                }
                const total = campus.length;
                return res.status(200).setHeader('Content-Range', `0-${total - 1}/${total}`).json(campus);
            default:
                throw new Error('Method not allowed');
        }
    } catch (error) {
        return res.status(500).json({"error": (error as any).message});
    }
}

import type {NextApiRequest, NextApiResponse} from 'next'

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
                const response = await fetch(`${process.env.API}/escolar/catalogos/areas-conocimiento`, {
                    headers: {
                        'Authorization': process.env.API_AUTHORIZATION ?? ""
                    }
                }).then(response => response.json());
                let knowledgeAreas = response['areas-conocimiento'].map((campus: { clave: string, nombre: string }) => (
                    {
                        id: campus['clave'],
                        nombre: campus['nombre']
                    }
                ));
                const id = req.query.filter === undefined ? "" : JSON.parse(req.query.filter as string)['id'];
                if (id) {
                    knowledgeAreas = knowledgeAreas.filter((campus: {id: number}) => campus.id === id[0]);
                }
                const total = knowledgeAreas.length;
                return res.status(200).setHeader('Content-Range', `0-${total - 1}/${total}`).json(knowledgeAreas);
            default:
                throw new Error('Method not allowed');
        }
    } catch (error) {
        return res.status(500).json({"error": (error as any).message});
    }
}

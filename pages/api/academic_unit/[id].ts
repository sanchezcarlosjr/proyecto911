import type {NextApiRequest, NextApiResponse} from 'next'

interface ErrorResponse {
    message: string;
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any[] | ErrorResponse>
) {
    try {
        switch (req.method) {
            case 'GET':
                const response = await fetch(`${process.env.API}/escolar/catalogos/campus/${req.query.id}/unidades-academicas`, {
                    headers: {
                        'Authorization': process.env.API_AUTHORIZATION ?? ""
                    }
                }).then(response => response.json());
                const academicUnits = response['unidadesAcademicas'].map((unidadAcademica: { idUnidadAcademica: string, nombreUnidadAcademica: string }) => (
                    {
                        id: unidadAcademica['idUnidadAcademica'],
                        nombre: unidadAcademica['nombreUnidadAcademica']
                    }
                ));
                const total = academicUnits.length;
                return res.status(200).setHeader('Content-Range', `0-${total - 1}/${total}`).json(academicUnits);
            default:
                throw new Error('Method not allowed');
        }
    } catch (error) {
        return res.status(500).json({"message": (error as any).message});
    }
}

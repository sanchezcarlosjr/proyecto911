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
                    {
                        "id": 126,
                        "periodo": "2022-1",
                        "campus_que_vista": "",
                        "unidad_academica_que_visita": "A",
                        "nombre": "",
                        "apellido_paterno": "",
                        "apellido_materno": "",
                        "sexo": "Femenino",
                        "nivel": "Licenciatura",
                        "discapacidad": false,
                        "habliante_indigena": false,
                        "origen_indigena": false,
                        "unidad_emisora": "",
                        "pais_de_la_unidad_emisora": "",
                        "entidad_de_la_unidad_emisora": "",
                        "tipo_de_movilidad_academica": "Docencia"
                    }
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

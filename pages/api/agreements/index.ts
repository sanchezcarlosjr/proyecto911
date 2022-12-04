import type { NextApiRequest, NextApiResponse } from 'next'
import Handler from "../../../lib/Handler";
import Agreements from "../../../models/agreements";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    return (new Handler(Agreements, (q) => (
        {
            $or: [
                {_id: {$regex: `.*${q}.*`, $options: "i"}},
                {nombre_de_convenio: {$regex: `.*${q}.*`, $options: "i"}},
                {periodo: {$regex: `.*${q}.*`, $options: "i"}},
            ]
        }
    ))).handle_index(req, res);
}

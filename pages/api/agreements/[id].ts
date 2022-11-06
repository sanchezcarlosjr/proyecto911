import type { NextApiRequest, NextApiResponse } from 'next'
import Handler from "../../../lib/Handler";
import Agreements from "../../../models/agreements";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
   return (new Handler(Agreements)).handle_id(req, res);
}

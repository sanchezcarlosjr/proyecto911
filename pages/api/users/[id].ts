import type { NextApiRequest, NextApiResponse } from 'next'
import Handler from "../../../lib/Handler";
import User from "../../../models/user";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
   return (new Handler(User)).handle_id(req, res);
}

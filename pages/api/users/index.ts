import type { NextApiRequest, NextApiResponse } from 'next'
import Handler from "../../../lib/Handler";
import {searchAcademics} from "../../../lib/searchAcademics";
import User from "../../../models/user";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    return (new Handler(User, searchAcademics)).handle_index(req, res);
}

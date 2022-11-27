import type { NextApiRequest, NextApiResponse } from 'next'
import Handler from "../../../lib/Handler";
import Outcome_exchange_student from "../../../models/outcome_exchange_student";
import {searchAcademics} from "../../../lib/searchAcademics";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    return (new Handler(Outcome_exchange_student, searchAcademics)).handle_index(req, res);
}

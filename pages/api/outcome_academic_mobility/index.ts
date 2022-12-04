import type { NextApiRequest, NextApiResponse } from 'next'
import OutcomeAcademicMobility from "../../../models/outcome_academic_mobility";
import Handler from "../../../lib/Handler";
import {searchAcademics} from "../../../lib/searchAcademics";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    return (new Handler(OutcomeAcademicMobility, searchAcademics)).handle_index(req, res);
}

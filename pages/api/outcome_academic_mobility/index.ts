import type { NextApiRequest, NextApiResponse } from 'next'
import OutcomeAcademicMobility from "../../../models/outcome_academic_mobility";
import Handler from "../../../lib/Handler";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    return (new Handler(OutcomeAcademicMobility)).handle_index(req, res);
}

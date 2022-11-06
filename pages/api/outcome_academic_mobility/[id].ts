import type { NextApiRequest, NextApiResponse } from 'next'
import Handler from "../../../lib/Handler";
import OutcomeAcademicMobility from "../../../models/outcome_academic_mobility";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
   return (new Handler(OutcomeAcademicMobility)).handle_id(req, res);
}

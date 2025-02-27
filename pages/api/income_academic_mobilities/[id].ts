import type { NextApiRequest, NextApiResponse } from 'next'
import Handler from "../../../lib/Handler";
import IncomeAcademicMobility from "../../../models/income_academic_mobility";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
   return (new Handler(IncomeAcademicMobility)).handle_id(req, res);
}

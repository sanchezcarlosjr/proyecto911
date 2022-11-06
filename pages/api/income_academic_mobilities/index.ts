import type { NextApiRequest, NextApiResponse } from 'next'
import IncomeAcademicMobility from "../../../models/income_academic_mobility";
import Handler from "../../../lib/Handler";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    return (new Handler(IncomeAcademicMobility)).handle_index(req, res);
}

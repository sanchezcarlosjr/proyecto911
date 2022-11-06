import type { NextApiRequest, NextApiResponse } from 'next'
import Handler from "../../../lib/Handler";
import outcome_exchange_student from "../../../models/outcome_exchange_student";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
   return (new Handler(outcome_exchange_student)).handle_id(req, res);
}

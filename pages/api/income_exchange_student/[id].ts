import type { NextApiRequest, NextApiResponse } from 'next'
import Handler from "../../../lib/Handler";
import IncomeExchangeStudent from "../../../models/income_exchange_student";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
   return (new Handler(IncomeExchangeStudent)).handle_id(req, res);
}

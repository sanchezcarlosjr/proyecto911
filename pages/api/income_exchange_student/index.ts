import type { NextApiRequest, NextApiResponse } from 'next'
import Handler from "../../../lib/Handler";
import IncomeExchangeStudent from "../../../models/income_exchange_student";
import {searchAcademics} from "../../../lib/searchAcademics";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    return (new Handler(IncomeExchangeStudent, searchAcademics)).handle_index(req, res);
}

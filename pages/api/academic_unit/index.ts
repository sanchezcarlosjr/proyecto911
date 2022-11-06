import type {NextApiRequest, NextApiResponse} from 'next'
import dbConnect from "../../../lib/ dbConnect";
import AcademicUnit from "../../../models/academic_unit";
import {getList} from "../../../lib/getList";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    try {
        await dbConnect();
        switch (req.method) {
            case 'GET':
                const result = await getList(req, AcademicUnit);
                return res.status(200).setHeader('Content-Range', `${req.query.range.join("-")}/${result.totalDocs}`).json(result.docs);
            default:
                throw new Error('Method not allowed');
        }
    } catch (error) {
        return res.status(500).json({"error": (error as any).message});
    }
}

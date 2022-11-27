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
    } catch (e) {
        return res.status(500).json({"error": "Service is not available."});
    }
    switch (req.method) {
        case 'GET':
            try {
                const result = await getList(req, AcademicUnit, (q) => (
                    {
                        $or: [
                            {_id: {$regex: `.*${q}.*`, $options: "i"}},
                            {nombre: {$regex: `.*${q}.*`, $options: "i"}}
                        ]
                    }
                ));
                // @ts-ignore
                return res.status(200).setHeader('Content-Range', `${req.query.range.join("-")}/${result.totalDocs}`).json(result.docs);
            } catch (error) {
                return res.status(400).json({"error": (error as any).message});
            }
        default:
            return res.status(401).json({"error": "Method is not allowed."});
    }
}
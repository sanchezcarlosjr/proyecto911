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
        return res.status(503).json({"message": "ra.notification.http_error"});
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
                console.warn(error);
                return res.status(503).json({"message": "ra.notification.http_error"});
            }
        default:
            return res.status(401).json({"message": "Method is not allowed."});
    }
}
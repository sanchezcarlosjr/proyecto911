import type {NextApiRequest, NextApiResponse} from 'next'
import dbConnect from "../../../lib/ dbConnect";
import {getList} from "../../../lib/getList";
import Campus from "../../../models/campus";

interface ErrorResponse {
    message: string;
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any[] | ErrorResponse>
) {
    try {
        await dbConnect();
    } catch (e) {
        return res.status(503).json({"message": "ra.notification.http_error"});
    }
    switch (req.method) {
        case 'GET':
            try {
                const result = await getList(req, Campus, (q) => (
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

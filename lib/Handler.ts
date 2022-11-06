import {NextApiRequest, NextApiResponse} from "next";
import dbConnect from "./ dbConnect";
import {saveOne} from "./saveOne";
import {getList} from "./getList";

interface ErrorResponse {
    error: string;
}

export default class Handler {
    constructor(private model: any) {
    }

    async handle_index(req: NextApiRequest,
                       res: NextApiResponse<any | ErrorResponse>) {
        try {
            await dbConnect();
            switch (req.method) {
                case 'POST':
                    await saveOne(req, this.model);
                    return res.status(200).json(req.body);
                case 'GET':
                    const result = await getList(req, this.model);
                    return res.status(200).setHeader('Content-Range', `${req.query.range.join("-")}/${result.totalDocs}`).json(result.docs);
                default:
                    throw new Error('Method not allowed');
            }
        } catch (error) {
            return res.status(500).json({"error": (error as any).message});
        }
    }

    async handle_id(req: NextApiRequest,
                    res: NextApiResponse<any | ErrorResponse>) {
        try {
            await dbConnect();
            switch (req.method) {
                case 'PUT':
                    await this.model.updateOne({_id: req.query.id}, req.body);
                    return res.status(200).json({id: req.query.id});
                case 'DELETE':
                    await this.model.deleteOne({_id: req.query.id});
                    return res.status(200).json({id: req.query.id});
                case 'GET':
                    const collection = await this.model.findById(req.query.id);
                    return res.status(200).json(collection);
                default:
                    throw new Error('Method not allowed');
            }
        } catch (error) {
            return res.status(500).json({"error": (error as any).message});
        }
    }


}
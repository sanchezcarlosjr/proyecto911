import {NextApiRequest, NextApiResponse} from "next";
import dbConnect from "./ dbConnect";
import {saveOne} from "./saveOne";
import {getList} from "./getList";
import jwt from "jsonwebtoken";

interface ErrorResponse {
    error: string;
}

export default class Handler {
    constructor(private model: any, private fListQuery: (query: Object) => Object = (query) => ({})) {
    }

    async handle_index(req: NextApiRequest, res: NextApiResponse<any | ErrorResponse>) {
        try {
            // @ts-ignore
            const token = req.headers.authorization.substr(7);
            jwt.verify(token, process.env.JWT_SECRET || "secret");
        } catch {
            return res.status(401).json({"message": "User is not authorized"});
        }
        try {
            await dbConnect();
        } catch (e) {
            return res.status(500).json({"message": "Service is not available."});
        }
        try {
            switch (req.method) {
                case 'POST':
                    await saveOne(req, this.model);
                    return res.status(201).json(req.body);
                case 'GET':
                    const result = await getList(req, this.model, this.fListQuery);
                    // @ts-ignore
                    return res.status(200).setHeader('Content-Range', `${req.query.range.join("-")}/${result.totalDocs}`).json(result.docs);
                default:
                    return res.status(406).json({"message": "Method is not allowed."});
            }
        } catch (error) {
            return res.status(400).json({"message": (error as any).message});
        }
    }

    async handle_id(req: NextApiRequest, res: NextApiResponse<any | ErrorResponse>) {
        try {
            // @ts-ignore
            const token = req.headers.authorization.substr(7);
            jwt.verify(token, process.env.JWT_SECRET || "secret");
        } catch {
            return res.status(401).json({"message": "User is not authorized"});
        }
        try {
            await dbConnect();
        } catch (e) {
            return res.status(500).json({"message": "Service is not available."});
        }
        try {
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
                    return res.status(406).json({"message": "Method is not allowed."});
            }
        } catch (error) {
            return res.status(400).json({"message": (error as any).message});
        }
    }

}

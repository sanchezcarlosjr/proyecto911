import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "./ dbConnect";
import { saveOne } from "./saveOne";
import { getList } from "./getList";
import jwt from "jsonwebtoken";
import userController from "../controllers/user";

interface ErrorResponse {
    message: string;
}

export default class Handler {
    constructor(private model: any, private fListQuery: (query: Object) => Object = (query) => ({})) {
    }

    async handle_index(req: NextApiRequest, res: NextApiResponse<any | ErrorResponse>) {
        let decoded = {};
        try {
            // @ts-ignore
            const token = req.headers.authorization.substr(7);
            decoded = jwt.verify(token, process.env.JWT_SECRET || "secret");
        } catch {
            return res.status(401).json({message: "ra.auth.auth_check_error"});
        }
        try {
            await dbConnect();
        } catch (e) {
            return res.status(503).json({message: "ra.notification.http_error"});
        }
        console.log(new Date(),decoded,req.method,req.body,req.query,req.headers);
        switch (req.method) {
            case 'POST':
                try {
                    await saveOne(req, this.model);
                    return res.status(201).json(req.body);
                } catch (error) {
                    console.warn(new Date(),decoded, error);
                    return res.status(400).json({"message": "ra.message.invalid_form"});
                }
            case 'GET':
                try {
                    const result = await getList(req, this.model, this.fListQuery);
                    // @ts-ignore
                    return res.status(200).setHeader('Content-Range', `${req.query.range.join("-")}/${result.totalDocs}`).json(result.docs);
                } catch (error) {
                    console.warn(new Date(),decoded, error);
                    return res.status(400).json({"message": "ra.message.invalid_form"});
                }
            default:
                return res.status(406).json({"message": "ra.notification.http_error"});
        }
    }

    async handle_id(req: NextApiRequest, res: NextApiResponse<any | ErrorResponse>) {
        let decoded = {};
        try {
            // @ts-ignore
            const token = req.headers.authorization.substr(7);
            decoded = jwt.verify(token, process.env.JWT_SECRET || "secret");
        } catch {
            return res.status(401).json({message: "ra.auth.auth_check_error"});
        }
        try {
            await dbConnect();
        } catch (e) {
            return res.status(503).json({message: "ra.notification.http_error"});
        }
        console.log(new Date(),decoded,req.method,req.body,req.query, req.headers);
        switch (req.method) {
            case 'PUT':
                try {
                    await this.model.updateOne({_id: req.query.id}, req.body);
                    return res.status(200).json({id: req.query.id});
                } catch (error) {
                    console.warn(new Date(),decoded,error);
                    return res.status(400).json({"message": "ra.message.invalid_form"});
                }
            case 'DELETE':
                try {
                    await this.model.deleteOne({_id: req.query.id});
                    return res.status(200).json({id: req.query.id});
                } catch (error) {
                    console.warn(new Date(),decoded,error);
                    return res.status(400).json({"message": "ra.message.invalid_form"});
                }
            case 'GET':
                try {
                    const collection = await this.model.findById(req.query.id);
                    return res.status(200).json(collection);
                } catch (error) {
                    console.warn(new Date(),decoded,error);
                    return res.status(400).json({"message": "ra.message.invalid_form"});
                }
            default:
                return res.status(406).json({"message": "ra.notification.http_error"});
        }
    }

}

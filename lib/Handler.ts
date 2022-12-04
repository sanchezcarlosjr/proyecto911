import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "./ dbConnect";
import { saveOne } from "./saveOne";
import { getList } from "./getList";
import jwt from "jsonwebtoken";
import userController from "../controllers/user";

interface ErrorResponse {
    error: string;
}

export default class Handler {
    constructor(private model: any) {
    }

    async handle_index(req: NextApiRequest,
        res: NextApiResponse<any | ErrorResponse>) {
        try {
            const decoded = jwt.verify(req.headers.authorization as string, process.env.JWT_SECRET || "secret");
            const { email } = decoded as any;
            const user = await userController.getUser(email);
            const resource = req.query.resource as string;
            await dbConnect();
            switch (req.method) {
                case 'POST':
                    if (!user.can(`${resource}.create.*`)) { // Ejemplo: income_academic_mobility.create.*
                        throw Error(`user cannot write ${resource}`);
                    }
                    await saveOne(req, this.model);
                    return res.status(200).json(req.body);
                case 'GET':
                    if (!user.can(`${resource}.read.*`)) { // Ejemplo: income_academic_mobility.read.*
                        throw Error(`user cannot read ${resource}`);
                    }
                    const result = await getList(req, this.model);
                    // @ts-ignore
                    return res.status(200).setHeader('Content-Range', `${req.query.range.join("-")}/${result.totalDocs}`).json(result.docs);
                case 'PUT':
                    if (!user.can(`${resource}.edit.*`)) { // Ejemplo: income_academic_mobility.edit.*
                        throw Error(`user cannot edit ${resource}`);
                    }
                    await this.model.updateOne(req, this.model);
                    return res.status(200).json(req.body);
                case 'DELETE':
                    if (!user.can(`${resource}.delete.*`)) { // Ejemplo: income_academic_mobility.delete.*
                        throw Error(`user cannot delete ${resource}`);
                    }
                    await this.model.deleteOne(req, this.model);
                    return res.status(200).json(req.body);
                default:
                    throw new Error('Method not allowed');
            }
        } catch (error) {
            return res.status(500).json({ "error": (error as any).message });
        }
    }

    async handle_id(req: NextApiRequest,
        res: NextApiResponse<any | ErrorResponse>) {
        try {
            const decoded = jwt.verify(req.headers.authorization as string, process.env.JWT_SECRET || "secret");
            const { email } = decoded as any;
            const user = await userController.getUser(email);
            const resource = req.query.resource as string;
            await dbConnect();
            switch (req.method) {
                case 'PUT':
                    if (!user.can(`${resource}.edit.*`)) { // Ejemplo: income_academic_mobility.edit.*
                        throw Error(`user cannot edit ${resource}`);
                    }
                    await this.model.updateOne({ _id: req.query.id }, req.body);
                    return res.status(200).json({ id: req.query.id });
                case 'DELETE':
                    if (!user.can(`${resource}.delete.*`)) { // Ejemplo: income_academic_mobility.delete.*
                        throw Error(`user cannot delete ${resource}`);
                    }
                    await this.model.deleteOne({ _id: req.query.id });
                    return res.status(200).json({ id: req.query.id });
                case 'GET':
                    if (!user.can(`${resource}.read.*`)) { // Ejemplo: income_academic_mobility.read.*
                        throw Error(`user cannot read ${resource}`);
                    }
                    const collection = await this.model.findById(req.query.id);
                    return res.status(200).json(collection);
                default:
                    throw new Error('Method not allowed');
            }
        } catch (error) {
            return res.status(500).json({ "error": (error as any).message });
        }
    }


}

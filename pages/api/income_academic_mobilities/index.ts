import type { NextApiRequest, NextApiResponse } from 'next'
import mongoose, {Schema} from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import dbConnect from "../../../lib/ dbConnect";

interface ErrorResponse {
    error: string;
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any | ErrorResponse>
) {
    try {
        await dbConnect();
        const schema = new Schema({ _id: String }, {
            strict: false,
            toJSON: {
                transform: function(doc, ret, options) {
                    ret.id = ret._id;
                    delete ret._id;
                    delete ret.__v;
                    return ret;
                }
            }
        });
        schema.plugin(mongoosePaginate);
        const income_academic_mobility = mongoose.models.income_academic_mobility || mongoose.model('income_academic_mobility', schema);
        switch (req.method) {
            case 'POST':
                const doc = new income_academic_mobility(req.body);
                doc._id = req.body.id;
                await doc.save();
                return res.status(200).json(req.body);
            case 'GET':
                req.query.range = JSON.parse((req.query?.range ?? "[0-10]") as string);
                req.query.filter = JSON.parse((req.query?.filter ?? "{}") as string) as object;
                req.query.sort = JSON.parse((req.query?.sort ?? "['_id', 'asc']") as string) as string[];
                const result = await income_academic_mobility.paginate(
                    Object.keys(req.query.filter).length !== 0 ? {
                        _id: req.query.filter.q
                    } : {} , {
                        offset: req.query.range[0],
                        limit: req.query.range[1]-req.query.range[0],
                        sort: [req.query.sort]
                    }
                );
                return res.status(200).setHeader('Content-Range', `${req.query.range.join("-")}/${result.totalDocs}`).json(result.docs);
            default:
                throw new Error('Method not allowed');
        }
    } catch (error) {
        return res.status(500).json({ "error": (error as any).message });
    }
}

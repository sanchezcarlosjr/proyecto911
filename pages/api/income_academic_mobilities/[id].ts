import type { NextApiRequest, NextApiResponse } from 'next'
import mongoose, {Schema} from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

interface ErrorResponse {
    error: string;
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any | ErrorResponse>
) {
    try {
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
        const income_academic_mobility = mongoose.models.income_academic_mobility || mongoose.model('income_academic_mobility', schema);
        switch (req.method) {
            case 'PUT':
                await income_academic_mobility.updateOne({_id: req.query.id}, req.body);
                return res.status(200).json({id: req.query.id});
            case 'DELETE':
                await income_academic_mobility.deleteOne({ _id: req.query.id });
                return res.status(200).json({id: req.query.id});
            case 'GET':
                const collection = await income_academic_mobility.findById(req.query.id);
                return res.status(200).json(collection);
            default:
                throw new Error('Method not allowed');
        }
    } catch (error) {
        return res.status(500).json({ "error": (error as any).message });
    }
}

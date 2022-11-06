import {NextApiRequest} from "next";

export async function saveOne(req: NextApiRequest, model: any) {
    const doc = new model(req.body);
    doc._id = req.body.id;
    await doc.save();
}
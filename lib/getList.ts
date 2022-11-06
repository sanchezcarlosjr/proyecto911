import {NextApiRequest} from "next";

export async function getList(req: NextApiRequest, model: any) {
    req.query.range = JSON.parse((req.query?.range ?? "[0,10]") as string);
    req.query.filter = JSON.parse((req.query?.filter ?? "{}") as string) as object;
    req.query.sort = JSON.parse((req.query?.sort ?? "[]") as string) as string[];
    return await model.paginate(
        Object.keys(req.query.filter).length !== 0 ? {
            _id: req.query.filter['q'] || req.query.filter['id']
        } : {}, {
            offset: req.query.range[0],
            limit: req.query.range[1] - req.query.range[0],
            sort: [req.query.sort]
        }
    );
}
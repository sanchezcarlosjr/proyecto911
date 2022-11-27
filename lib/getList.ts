import {NextApiRequest} from "next";

export async function getList(req: NextApiRequest, model: any, fQuery: (query: Object) => Object) {
    req.query.range = JSON.parse((req.query?.range ?? "[0,10]") as string) as any;
    req.query.filter = JSON.parse((req.query?.filter ?? "{}") as string) as any;
    req.query.sort = JSON.parse((req.query?.sort ?? "[]") as string) as any;
    const q = (req.query?.filter as any)?.q;
    const id = (req.query?.filter as any)?.id;
    return await model.paginate(
	// @ts-ignore
        Object.keys(req.query.filter).length !== 0 ?   q  ?  fQuery(q) : id ? {_id: id} : {} : {}, {
		// @ts-ignore
            offset: req.query.range[0],
		// @ts-ignore
            limit: req.query.range[1] - req.query.range[0],
		// @ts-ignore
            sort: [req.query.sort[0] === "id" ? ["_id", req.query.sort[1]] : req.query.sort]
        }
    );
}

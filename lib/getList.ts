import {NextApiRequest} from "next";

export async function getList(req: NextApiRequest, model: any) {
    req.query.range = JSON.parse((req.query?.range ?? "[0,10]") as string) as any;
    req.query.filter = JSON.parse((req.query?.filter ?? "{}") as string) as any;
    req.query.sort = JSON.parse((req.query?.sort ?? "[]") as string) as any;
    const q = (req.query?.filter as any)?.q;
    const id = (req.query?.filter as any)?.id;
    return await model.paginate(
	// @ts-ignore
        Object.keys(req.query.filter).length !== 0 ?   q  ?  {
            $or: [
                {_id: {$regex: `.*${q}.*`, $options: "i"}},
                {nombre: {$regex: `.*${q}.*`, $options: "i"}},
                {nombre_de_convenio: {$regex: `.*${q}.*`, $options: "i"}},
                {periodo: {$regex: `.*${q}.*`, $options: "i"}}
            ]
        } : id ? {_id: id} : {} : {}
        , {
		// @ts-ignore
            offset: req.query.range[0],
		// @ts-ignore
            limit: req.query.range[1] - req.query.range[0],
		// @ts-ignore
            sort: [req.query.sort]
        }
    );
}

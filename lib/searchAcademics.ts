export const searchAcademics = (q: Object) => (
    {
        $or: [
            {_id: {$regex: `.*${q}.*`, $options: "i"}},
            {nombre: {$regex: `.*${q}.*`, $options: "i"}},
            {periodo: {$regex: `.*${q}.*`, $options: "i"}}
        ]
    }
);
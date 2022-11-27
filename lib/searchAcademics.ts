export const searchAcademics = (q: Object) => (
    {
        $or: [
            {_id: {$regex: `.*${q}.*`, $options: "i"}},
            {nombre: {$regex: `.*${q}.*`, $options: "i"}},
            {apellido_paterno: {$regex: `.*${q}.*`, $options: "i"}},
            {apellido_materno: {$regex: `.*${q}.*`, $options: "i"}},
            {nivel_de_estudios: {$regex: `.*${q}.*`, $options: "i"}},
            {unidad_académica_id: {$regex: `.*${q}.*`, $options: "i"}},
            {campus_id: {$regex: `.*${q}.*`, $options: "i"}},
            {país_de_la_unidad_receptora: {$regex: `.*${q}.*`, $options: "i"}},
            {entidad_de_la_unidad_receptora: {$regex: `.*${q}.*`, $options: "i"}},
            {idioma_de_la_unidad_receptora: {$regex: `.*${q}.*`, $options: "i"}},
            {unidad_receptora: {$regex: `.*${q}.*`, $options: "i"}},
            {país_de_la_unidad_emisora: {$regex: `.*${q}.*`, $options: "i"}},
            {entidad_de_la_unidad_emisora: {$regex: `.*${q}.*`, $options: "i"}},
            {idioma_de_la_unidad_emisora: {$regex: `.*${q}.*`, $options: "i"}},
            {unidad_receptora: {$regex: `.*${q}.*`, $options: "i"}},
            {sexo: {$regex: `.*${q}.*`, $options: "i"}},
            {periodo: {$regex: `.*${q}.*`, $options: "i"}}
        ]
    }
);
import * as React from 'react';
import { Create, Edit, SimpleForm, SelectInput, BooleanInput, TextInput, required } from 'react-admin';

const IncomeAcademicMobility = <SimpleForm>
    <TextInput source="id" validate={[required()]} fullWidth />
    <TextInput source="periodo" fullWidth />
    <TextInput source="campus_que_visita" fullWidth />
    <TextInput source="unidad_académica_que_visita" fullWidth />
    <TextInput source="nombre" fullWidth />
    <TextInput source="apellido_paterno" fullWidth />
    <SelectInput source="sexo" choices={[
        { id: 'Masculino', name: 'Masculino' },
        { id: 'Femenino', name: 'Femenino' },
    ]}  fullWidth />
    <TextInput source="nivel" fullWidth />
    <BooleanInput source="discapacidad" fullWidth/>
    <BooleanInput source="hablante_indígena" fullWidth/>
    <BooleanInput source="origen_indígena" fullWidth/>
    <TextInput source="unidad_emisora" fullWidth />
    <TextInput source="país_de_la_unidad_emisora" fullWidth />
    <TextInput source="entidad_de_la_unidad_emisora" fullWidth />
    <SelectInput source="tipo_de_movilidad_académica" choices={[
        { id: 'Docente', name: 'Docente' }
    ]} fullWidth />
</SimpleForm>;

export const IncomeAcademicMobilityCreate = () => (
    <Create>
        {IncomeAcademicMobility}
    </Create>
);

export const IncomeAcademicMobilityEdit = () => (
    <Edit>
        {IncomeAcademicMobility}
    </Edit>
);
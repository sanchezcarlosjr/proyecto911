import * as React from 'react';
import { Create, Edit, SimpleForm, SelectField, BooleanField, TextInput, DateInput, required } from 'react-admin';

const IncomeAcademicMobility = <SimpleForm>
    <TextInput source="id" validate={[required()]} fullWidth />
    <TextInput source="periodo" fullWidth />
    <TextInput source="campus_que_visita" fullWidth />
    <TextInput source="unidad_academica_que_visita" fullWidth />
    <TextInput source="nombre" label="Nombre" fullWidth />
    <TextInput source="apellido_paterno" fullWidth />
    <SelectField source="sexo" choices={[
        { id: 'Femenino', name: 'Femenino' },
        { id: 'Masculino', name: 'Masculino' },
    ]} fullWidth />
    <TextInput source="nivel" fullWidth />
    <BooleanField source="discapacidad" fullWidth/>
    <BooleanField source="habliante_indigena" fullWidth/>
    <BooleanField source="origen_indigena" fullWidth/>
    <TextInput source="unidad_emisora" fullWidth />
    <TextInput source="pais_de_la_unidad_emisora" fullWidth />
    <TextInput source="entidad_de_la_unidad_emisora" fullWidth />
    <SelectField source="tipo_de_movilidad_academica" choices={[
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
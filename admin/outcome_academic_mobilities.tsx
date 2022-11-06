import * as React from 'react';
import {
    AutocompleteInput,
    BooleanField,
    BooleanInput,
    Create,
    Datagrid,
    Edit,
    FormDataConsumer,
    List,
    ReferenceField,
    ReferenceInput,
    required,
    SelectInput,
    SimpleForm,
    TextField,
    TextInput, useRecordContext, useGetOne
} from 'react-admin';
import {ListActions} from "./list_actions";
import {Filter} from "./filter";

const OutcomeAcademicMobility = <SimpleForm>
    <TextInput source="id" validate={[required()]} fullWidth />
    <TextInput source="periodo" fullWidth />
    <ReferenceInput source="campus_id" reference="campus">
        <SelectInput optionText="nombre" optionValue="id" fullWidth label="Campus" />
    </ReferenceInput>
    <ReferenceInput source="academic_unit_id" reference="academic_unit" >
        <AutocompleteInput optionText="nombre" optionValue="id" label="Unidad académica" fullWidth />
    </ReferenceInput>
    <TextInput source="nombre" fullWidth />
    <TextInput source="apellido_paterno" fullWidth />
    <TextInput source="apellido_materno" fullWidth />
    <SelectInput source="sexo" choices={[
        { id: 'Masculino', name: 'Masculino' },
        { id: 'Femenino', name: 'Femenino' },
    ]}  fullWidth />
    <SelectInput source="nivel_de_estudios" choices={[
        { id: 'Licenciatura', name: 'Licenciatura' },
        { id: 'Especialidad', name: 'Especialidad' },
        { id: 'Maestría', name: 'Maestría' },
        { id: 'Doctorado', name: 'Doctorado' }
    ]} fullWidth />
    <TextInput source="unidad_receptora" fullWidth />
    <TextInput source="país_de_la_unidad_receptora" fullWidth />
    <TextInput source="entidad_de_la_unidad_receptora" fullWidth />
    <TextInput source="idioma_de_la_unidad_receptora" fullWidth />
    <SelectInput source="tipo_de_movilidad_académica" choices={[
        { id: 'Docencia', name: 'Docencia' },
        { id: 'Estancias sabáticas', name: 'Estancias sabáticas' },
        { id: 'Estancias de investigación', name: 'Estancias de investigación' },
    ]} fullWidth />
</SimpleForm>;

export const OutcomeAcademicMobilityList = () => (
    <List filters={Filter} actions={<ListActions/>}>
        <Datagrid rowClick="edit">
            <TextField source="id"/>
            <TextField source="periodo"/>
            <TextField source="nombre"/>
            <TextField source="apellido_paterno"/>
            <TextField source="apellido_materno"/>
            <TextField source="nivel_de_estudios"/>
            <ReferenceField source="campus_id" reference="campus"  label={"Campus"}>
                <TextField source="nombre" />
            </ReferenceField>
            <ReferenceField source="academic_unit_id" reference="academic_unit"  label={"Unidad Académica"}>
                <TextField source="nombre" />
            </ReferenceField>
            <TextField source="unidad_receptora"/>
            <TextField source="país_de_la_unidad_receptora"/>
            <TextField source="entidad_de_la_unidad_receptora"/>
            <TextField source="idioma_de_la_unidad_receptora"/>
            <TextField source="tipo_de_movilidad_académica"/>
        </Datagrid>
    </List>
);

export const OutcomeAcademicMobilityCreate = () => (
    <Create>
        {OutcomeAcademicMobility}
    </Create>
);

export const OutcomeAcademicMobilityEdit = () => (
    <Edit>
        {OutcomeAcademicMobility}
    </Edit>
);


export default {
    options: {
        label: "Movilidad A. de salida"
    },
    edit: OutcomeAcademicMobilityEdit,
    list: OutcomeAcademicMobilityList,
    create: OutcomeAcademicMobilityCreate
}
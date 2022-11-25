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

const IncomeAcademicMobility = <SimpleForm>
    <TextInput source="id" validate={[required()]} fullWidth helperText={"Pasaporte si es internacional. INE si es nacional."} />
    <TextInput source="periodo" fullWidth />
    <ReferenceInput source="campus_id" reference="campus">
        <SelectInput optionText="nombre" optionValue="id" fullWidth label="Campus que visita" />
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
    <BooleanInput source="discapacidad" fullWidth/>
    <BooleanInput source="hablante_indígena" fullWidth/>
    <BooleanInput source="origen_indígena" fullWidth/>
    <TextInput source="unidad_emisora" fullWidth />
    <TextInput source="país_de_la_unidad_emisora" fullWidth />
    <TextInput source="entidad_de_la_unidad_emisora" fullWidth />
    <SelectInput source="tipo_de_movilidad_académica" choices={[
        { id: 'Docencia', name: 'Docencia' },
        { id: 'Estancias sabáticas', name: 'Estancias sabáticas' },
        { id: 'Estancias de investigación', name: 'Estancias de investigación' },
    ]} fullWidth />
</SimpleForm>;

export const IncomeAcademicMobilityList = () => (
    <List filters={Filter} actions={<ListActions/>}>
        <Datagrid rowClick="edit">
            <TextField source="id"/>
            <TextField source="periodo"/>
            <TextField source="nombre"/>
            <TextField source="apellido_paterno"/>
            <TextField source="apellido_materno"/>
            <TextField source="nivel_de_estudios"/>
            <BooleanField source="discapacidad"/>
            <BooleanField source="hablante_indígena"/>
            <BooleanField source="origen_indígena"/>
            <ReferenceField source="campus_id" reference="campus"  label={"Campus"}>
                <TextField source="nombre" />
            </ReferenceField>
            <ReferenceField source="academic_unit_id" reference="academic_unit"  label={"Unidad Académica"}>
                <TextField source="nombre" />
            </ReferenceField>
            <TextField source="unidad_emisora"/>
            <TextField source="país_de_la_unidad_emisora"/>
            <TextField source="entidad_de_la_unidad_emisora"/>
            <TextField source="tipo_de_movilidad_académica"/>
        </Datagrid>
    </List>
);

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


export default {
    options: {
        label: "Movilidad A. de entrada"
    },
    edit: IncomeAcademicMobilityEdit,
    list: IncomeAcademicMobilityList,
    create: IncomeAcademicMobilityCreate
}
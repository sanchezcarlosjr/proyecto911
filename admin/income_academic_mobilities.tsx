import * as React from 'react';
import {
    BooleanField,
    BooleanInput,
    Create,
    Datagrid,
    Edit,
    List,
    ReferenceField,
    ReferenceInput,
    required,
    SelectInput,
    SimpleForm,
    TextField,
    TextInput
} from 'react-admin';
import {ListActions} from "./list_actions";
import {Filter} from "./filter";
import {AcademicUnitAutocompleteInput, DegreeLevelInput, KindOfAcademicMobilityInput, SexInput} from "./common_inputs";

const IncomeAcademicMobility = <SimpleForm>
    <TextInput source="id" validate={[required()]} fullWidth helperText={"Pasaporte si es internacional. INE si es nacional."}/>
    <TextInput source="nombre" fullWidth/>
    <TextInput source="apellido_paterno" fullWidth/>
    <TextInput source="apellido_materno" fullWidth/>
    {SexInput}
    {DegreeLevelInput}
    <TextInput source="periodo" fullWidth/>
    <ReferenceInput source="campus_id" reference="campus">
        <SelectInput optionText="nombre" optionValue="id" fullWidth label="Campus que visita"/>
    </ReferenceInput>
    {AcademicUnitAutocompleteInput}
    <TextInput source="unidad_emisora" fullWidth/>
    <TextInput source="país_de_la_unidad_emisora" fullWidth/>
    <TextInput source="entidad_de_la_unidad_emisora" fullWidth helperText={"Estado, comunidad, departamento. Ejemplo: Baja California, Madrid, Bógota."} />
    {KindOfAcademicMobilityInput}
    <BooleanInput source="discapacidad" fullWidth/>
    <BooleanInput source="hablante_indígena" fullWidth />
    <BooleanInput source="origen_indígena" fullWidth/>
</SimpleForm>;

export const IncomeAcademicMobilityList = () => (
    <List filters={Filter} actions={<ListActions/>}>
        <Datagrid rowClick="edit">
            <TextField source="id" />
            <TextField source="periodo"/>
            <TextField source="nombre"/>
            <TextField source="apellido_paterno"/>
            <TextField source="apellido_materno"/>
            <TextField source="sexo" />
            <TextField source="nivel_de_estudios"/>
            <TextField source="tipo_de_movilidad_académica"/>
            <BooleanField source="discapacidad"/>
            <BooleanField source="hablante_indígena"/>
            <BooleanField source="origen_indígena"/>
            <ReferenceField source="campus_id" reference="campus">
                <TextField source="nombre"/>
            </ReferenceField>
            <ReferenceField source="unidad_académica_id" reference="academic_unit" >
                <TextField source="nombre"/>
            </ReferenceField>
            <TextField source="unidad_emisora"/>
            <TextField source="país_de_la_unidad_emisora"/>
            <TextField source="entidad_de_la_unidad_emisora" />
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
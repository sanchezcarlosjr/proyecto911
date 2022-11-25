import * as React from 'react';
import {
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

const OutcomeAcademicMobility = <SimpleForm>
    <TextInput source="id" validate={[required()]} fullWidth label={"Número de empleado"}/>
    <TextInput source="nombre" fullWidth/>
    <TextInput source="apellido_paterno" fullWidth/>
    <TextInput source="apellido_materno" fullWidth/>
    {SexInput}
    {DegreeLevelInput}
    <TextInput source="periodo" fullWidth/>
    <ReferenceInput source="campus_id" reference="campus">
        <SelectInput optionText="nombre" optionValue="id" fullWidth label="Campus"/>
    </ReferenceInput>
    {AcademicUnitAutocompleteInput}
    <TextInput source="unidad_receptora" fullWidth/>
    <TextInput source="país_de_la_unidad_receptora" fullWidth/>
    <TextInput source="entidad_de_la_unidad_receptora" fullWidth
               helperText={"Estado, comunidad, departamento. Ejemplo: Baja California, Madrid, Bógota."}/>
    <TextInput source="idioma_de_la_unidad_receptora" fullWidth/>
    {KindOfAcademicMobilityInput}
</SimpleForm>;

export const OutcomeAcademicMobilityList = () => (
    <List filters={Filter} actions={<ListActions/>}>
        <Datagrid rowClick="edit">
            <TextField source="id" label={"Número de empleado"}/>
            <TextField source="periodo"/>
            <TextField source="nombre"/>
            <TextField source="apellido_paterno"/>
            <TextField source="apellido_materno"/>
            <TextField source="sexo"/>
            <TextField source="nivel_de_estudios"/>
            <TextField source="tipo_de_movilidad_académica"/>
            <ReferenceField source="campus_id" reference="campus" label={"Campus"}>
                <TextField source="nombre"/>
            </ReferenceField>
            <ReferenceField source="unidad_académica_id" reference="academic_unit" label={"Unidad Académica"}>
                <TextField source="nombre"/>
            </ReferenceField>
            <TextField source="unidad_receptora"/>
            <TextField source="país_de_la_unidad_receptora"/>
            <TextField source="entidad_de_la_unidad_receptora"/>
            <TextField source="idioma_de_la_unidad_receptora"/>
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
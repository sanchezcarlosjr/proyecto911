import * as React from 'react';
import {
    BooleanField,
    BooleanInput,
    Create,
    Datagrid,
    DateField,
    DateInput,
    Edit,
    List, NumberField,
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
import {
    AcademicUnitAutocompleteInput,
    CurrencyInput,
    DegreeLevelInput,
    KindOfExchangeStudent,
    SexInput
} from "./common_inputs";

const IncomeExchangeStudent = <SimpleForm>
    <TextInput source="id" validate={[required()]} fullWidth helperText={"Pasaporte si es internacional. INE si es nacional."}/>
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
    <TextInput source="programa_educativo" fullWidth/>
    <TextInput source="área_de_conocimiento" fullWidth/>
    {KindOfExchangeStudent}
    <BooleanInput source="discapacidad"/>
    <BooleanInput source="hablante_indígena"/>
    <BooleanInput source="origen_indígena"/>
    <TextInput source="unidad_emisora" fullWidth/>
    <TextInput source="país_de_la_unidad_emisora" fullWidth/>
    <TextInput source="entidad_de_la_unidad_emisora" fullWidth  helperText={"Estado, comunidad, departamento. Ejemplo: Baja California, Madrid, Bógota."}/>
    <TextInput source="idioma_de_la_unidad_emisora" fullWidth/>
    <BooleanInput source="recibio_finacimiento"/>
    {CurrencyInput}
    <DateInput source="fecha_de_inicio_de_intercambio" fullWidth/>
    <DateInput source="fecha_de_término_de_intercambio" fullWidth/>
</SimpleForm>;

export const IncomeExchangeStudentList = () => (
    <List filters={Filter} actions={<ListActions/>}>
        <Datagrid rowClick="edit">
            <TextField source="id"/>
            <TextField source="periodo"/>
            <TextField source="nombre"/>
            <TextField source="apellido_paterno"/>
            <TextField source="apellido_materno"/>
            <TextField source="sexo" />
            <TextField source="nivel_de_estudios"/>
            <TextField source="programa_educativo"/>
            <TextField source="área_de_conocimiento"/>
            <TextField source="tipo_de_intercambio_estudiantil" />
            <ReferenceField source="campus_id" reference="campus">
                <TextField source="nombre"/>
            </ReferenceField>
            <ReferenceField source="unidad_académica_id" reference="academic_unit">
                <TextField source="nombre"/>
            </ReferenceField>
            <BooleanField source="discapacidad"/>
            <BooleanField source="hablante_indígena"/>
            <BooleanField source="origen_indígena"/>
            <TextField source="unidad_emisora"/>
            <TextField source="país_de_la_unidad_emisora"/>
            <TextField source="entidad_de_la_unidad_emisora" />
            <TextField source="idioma_de_la_unidad_emisora"/>
            <BooleanField source="recibio_finacimiento"/>
            <NumberField source="monto_recibido" />
            <DateField source="fecha_de_inicio_de_intercambio" />
            <DateField source="fecha_de_término_de_intercambio" />
        </Datagrid>
    </List>
);

export const IncomeExchangeStudentCreate = () => (
    <Create>
        {IncomeExchangeStudent}
    </Create>
);

export const IncomeExchangeStudentEdit = () => (
    <Edit>
        {IncomeExchangeStudent}
    </Edit>
);


export default {
    options: {
        label: "Intercambio estudiantil entrada"
    },
    edit: IncomeExchangeStudentEdit,
    list: IncomeExchangeStudentList,
    create: IncomeExchangeStudentCreate
}
import * as React from 'react';
import {
    BooleanField,
    BooleanInput,
    Create,
    Datagrid,
    DateField,
    DateInput,
    Edit,
    List,
    NumberField,
    ReferenceField,
    ReferenceInput,
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
    IdInputValidator,
    InputValidator,
    KindOfExchangeStudent, PeriodInput,
    SexInput
} from "./common_inputs";

const OutcomeExchangeStudent = <SimpleForm>
    <TextInput validate={IdInputValidator} source="id" fullWidth label={"Matrícula del estudiante"}/>
    <TextInput validate={InputValidator} source="nombre" fullWidth/>
    <TextInput validate={InputValidator} source="apellido_paterno" fullWidth/>
    <TextInput validate={InputValidator} source="apellido_materno" fullWidth/>
    {SexInput}
    {DegreeLevelInput}
    {PeriodInput}
    <ReferenceInput source="campus_id" reference="campus">
        <SelectInput optionText="nombre" optionValue="id" fullWidth label="Campus"/>
    </ReferenceInput>
    {AcademicUnitAutocompleteInput}
    <TextInput validate={InputValidator} source="programa_educativo" fullWidth/>
    <TextInput validate={InputValidator} source="área_de_conocimiento" fullWidth/>
    {KindOfExchangeStudent}
    <BooleanInput source="discapacidad"/>
    <BooleanInput source="hablante_indígena"/>
    <BooleanInput source="origen_indígena"/>
    <TextInput validate={InputValidator} source="unidad_receptora" fullWidth/>
    <TextInput validate={InputValidator} source="país_de_la_unidad_receptora" fullWidth/>
    <TextInput validate={InputValidator} source="entidad_de_la_unidad_receptora" fullWidth
               helperText={"Estado, comunidad, departamento. Ejemplo: Baja California, Madrid, Bógota."}/>
    <TextInput validate={InputValidator} source="idioma_de_la_unidad_receptora" fullWidth/>
    <BooleanInput source="recibio_financiamiento"/>
    {CurrencyInput}
    <DateInput source="fecha_de_inicio_de_intercambio" fullWidth/>
    <DateInput source="fecha_de_término_de_intercambio" fullWidth/>
</SimpleForm>;

export const OutcomeExchangeStudentList = () => (
    <List filters={Filter} actions={<ListActions/>}>
        <Datagrid rowClick="edit">
            <TextField source="id" label={"Matrícula del estudiante"}/>
            <TextField source="periodo"/>
            <TextField source="nombre"/>
            <TextField source="apellido_paterno"/>
            <TextField source="apellido_materno"/>
            <TextField source="sexo"/>
            <TextField source="nivel_de_estudios"/>
            <TextField source="programa_educativo"/>
            <TextField source="área_de_conocimiento"/>
            <TextField source="tipo_de_intercambio_estudiantil"/>
            <ReferenceField source="campus_id" reference="campus">
                <TextField source="nombre"/>
            </ReferenceField>
            <ReferenceField source="unidad_académica_id" reference="academic_unit">
                <TextField source="nombre"/>
            </ReferenceField>
            <BooleanField source="discapacidad"/>
            <BooleanField source="hablante_indígena"/>
            <BooleanField source="origen_indígena"/>
            <TextField source="unidad_receptora"/>
            <TextField source="país_de_la_unidad_receptora"/>
            <TextField source="entidad_de_la_unidad_receptora"/>
            <TextField source="idioma_de_la_unidad_receptora"/>
            <BooleanField source="recibio_financiamiento"/>
            <NumberField source="monto_recibido"/>
            <DateField source="fecha_de_inicio_de_intercambio"/>
            <DateField source="fecha_de_término_de_intercambio"/>
        </Datagrid>
    </List>
);

export const OutcomeExchangeStudentCreate = () => (
    <Create>
        {OutcomeExchangeStudent}
    </Create>
);

export const OutcomeExchangeStudentEdit = () => (
    <Edit>
        {OutcomeExchangeStudent}
    </Edit>
);


export default {
    options: {
        label: "Intercambio estudiantil salida"
    },
    edit: OutcomeExchangeStudentEdit,
    list: OutcomeExchangeStudentList,
    create: OutcomeExchangeStudentCreate
}
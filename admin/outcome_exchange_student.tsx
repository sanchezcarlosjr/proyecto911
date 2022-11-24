import * as React from 'react';
import {
    AutocompleteInput,
    BooleanField,
    BooleanInput,
    Create,
    Datagrid,
    Edit,
    DateField,
    DateInput,
    FormDataConsumer,
    List,
    NumberInput,
    ReferenceField,
    ReferenceInput,
    required,
    SelectInput,
    SimpleForm,
    TextField,
    TextInput, NumberField
} from 'react-admin';
import {ListActions} from "./list_actions";
import {Filter} from "./filter";

const OutcomeExchangeStudent = <SimpleForm>
    <TextInput source="id" validate={[required()]} fullWidth/>
    <TextInput source="periodo" fullWidth/>
    <ReferenceInput source="campus_id" reference="campus">
        <SelectInput optionText="nombre" optionValue="id" fullWidth label="Campus"/>
    </ReferenceInput>
    <ReferenceInput source="academic_unit_id" reference="academic_unit" >
        <AutocompleteInput optionText="nombre" optionValue="id" label="Unidad académica" fullWidth />
    </ReferenceInput>
    <SelectInput source="nivel_de_estudios" choices={[
        {id: 'Licenciatura', name: 'Licenciatura'},
        {id: 'Especialidad', name: 'Especialidad'},
        {id: 'Maestría', name: 'Maestría'},
        {id: 'Doctorado', name: 'Doctorado'}
    ]} fullWidth/>
    <TextInput source="programa_educativo" fullWidth/>
    <TextInput source="área_de_conocimiento" fullWidth/>
    <TextInput source="nombre" fullWidth/>
    <TextInput source="apellido_paterno" fullWidth/>
    <TextInput source="apellido_materno" fullWidth/>
    <SelectInput source="sexo" choices={[
        {id: 'Masculino', name: 'Masculino'},
        {id: 'Femenino', name: 'Femenino'},
    ]} fullWidth/>
    <BooleanInput source="discapacidad"/>
    <BooleanInput source="hablante_indígena"/>
    <BooleanInput source="origen_indígena"/>
    <TextInput source="unidad_receptora" fullWidth/>
    <TextInput source="país_de_la_unidad_receptora" fullWidth/>
    <TextInput source="entidad_de_la_unidad_receptora" fullWidth/>
    <TextInput source="idioma_de_la_unidad_receptora" fullWidth/>
    <BooleanInput source="recibio_finacimiento"/>
    <NumberInput source="monto_recibido" fullWidth defaultValue={0}/>
    <DateInput source="fecha_de_inicio_de_intercambio" fullWidth/>
    <DateInput source="fecha_de_término_de_intercambio" fullWidth/>
</SimpleForm>;

export const OutcomeExchangeStudentList = () => (
    <List filters={Filter} actions={<ListActions/>}>
        <Datagrid rowClick="edit">
            <TextField source="id"/>
            <TextField source="periodo"/>
            <TextField source="nombre"/>
            <TextField source="apellido_paterno"/>
            <TextField source="apellido_materno"/>
            <TextField source="nivel_de_estudios"/>
            <TextField source="programa_educativo"/>
            <TextField source="área_de_conocimiento"/>
            <ReferenceField source="campus_id" reference="campus" label={"Campus"}>
                <TextField source="nombre"/>
            </ReferenceField>
            <ReferenceField source="academic_unit_id" reference="academic_unit" label={"Unidad Académica"}>
                <TextField source="nombre"/>
            </ReferenceField>
            <BooleanField source="discapacidad"/>
            <BooleanField source="hablante_indígena"/>
            <BooleanField source="origen_indígena"/>
            <TextField source="unidad_receptora"/>
            <TextField source="país_de_la_unidad_receptora"/>
            <TextField source="entidad_de_la_unidad_receptora"/>
            <TextField source="idioma_de_la_unidad_receptora"/>
            <BooleanField source="recibio_finacimiento"/>
            <NumberField source="monto_recibido" />
            <DateField source="fecha_de_inicio_de_intercambio" fullWidth/>
            <DateField source="fecha_de_término_de_intercambio" fullWidth/>
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
import * as React from 'react';
import {
    BooleanField,
    BooleanInput,
    Create,
    Datagrid,
    Edit,
    List,
    DateField,
    required,
    SelectInput,
    SimpleForm,
    TextField,
    DateInput,
    TextInput
} from 'react-admin';
import {ListActions} from "./list_actions";
import {Filter} from "./filter";


const Agreement = <SimpleForm>
    <TextInput source="id" label="Clave" validate={[required()]} fullWidth />
    <TextInput source="periodo" fullWidth />
    <TextInput source="nombre_de_convenio" fullWidth />
    <TextInput source="nombre_de_la_institución_u_organización" fullWidth />
    <DateInput source="inicio_de_convenio" fullWidth />
    <SelectInput source="sector_de_la_institución_u_organización" choices={[
        { id: 'Público', name: 'Público' },
        { id: 'Social', name: 'Social' },
        { id: 'Privado', name: 'Privado' }
    ]} fullWidth />
    <SelectInput source="tipo_de_institución_u_organización" choices={[
        { id: 'Nacional', name: 'Nacional' },
        { id: 'Internacional', name: 'Internacional' }
    ]} fullWidth />
    <TextInput source="país_de_la_institución_u_organización" fullWidth />
    <BooleanInput source="es_convenio_académico"/>
    <BooleanInput source="es_convenio_investigación"/>
    <BooleanInput source="es_convenio_de_intercambio_estudiantil"/>
    <BooleanInput source="es_convenio_de_movilidad_académica"/>
</SimpleForm>;

export const AgreementList = () => (
    <List filters={Filter} actions={<ListActions/>}>
        <Datagrid rowClick="edit">
            <TextField source="id" label={"Clave"}/>
            <TextField source="nombre_de_convenio"/>
            <TextField source="periodo"/>
            <TextField source="nombre_de_la_institución_u_organización"/>
            <DateField source="inicio_de_convenio"/>
            <TextField source="sector_de_la_institución_u_organización"/>
            <TextField source="tipo_de_institución_u_organización"/>
            <TextField source="país_de_la_institución_u_organización"/>
            <BooleanField source="es_convenio_académico"/>
            <BooleanField source="es_convenio_investigación"/>
            <BooleanField source="es_convenio_de_intercambio_estudiantil"/>
            <BooleanField source="es_convenio_de_movilidad_académica"/>
        </Datagrid>
    </List>
);

export const AgreementCreate = () => (
    <Create>
        {Agreement}
    </Create>
);

export const AgreementEdit = () => (
    <Edit>
        {Agreement}
    </Edit>
);


export default {
    options: {
        label: "Convenios"
    },
    edit: AgreementEdit,
    list: AgreementList,
    create: AgreementCreate
}
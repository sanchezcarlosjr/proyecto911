import {AutocompleteInput, NumberInput, ReferenceInput, regex, required, SelectInput, TextInput} from "react-admin";
import * as React from "react";
import {InputAdornment} from "@mui/material";

export const InputValidator = [required(), regex(/^[A-Z]+$/, 'Solo mayúsculas ASCII. Sin acentos u otro símbolos.')];
export const IdInputValidator = [required(), regex(/^[A-Z0-9]+$/, 'Solo números o mayúsculas ASCII. Sin acentos u otro símbolos.')];

export const DegreeLevelInput = <SelectInput source="nivel_de_estudios"
                                             choices={[{id: 'LICENCIATURA', name: 'LICENCIATURA'}, {
                                                 id: 'ESPECIALIDAD',
                                                 name: 'ESPECIALIDAD'
                                             }, {id: 'MAESTRIA', name: 'MAESTRIA'}, {
                                                 id: 'DOCTORADO',
                                                 name: 'DOCTORADO'
                                             }]} fullWidth/>;

export const SexInput = <SelectInput source="sexo" choices={[{id: 'MASCULINO', name: 'MASCULINO'}, {
    id: 'FEMENINO',
    name: 'FEMENINO'
},]} fullWidth/>

export const PeriodInput = <TextInput source="periodo" fullWidth helperText={"El periodo debe estar en formato AAAA-P. Ejemplo: 2022-2"} validate={[required(), regex(/^\d\d\d\d-\d$/, 'El periodo debe estar en formato AAAA-P. Ejemplo: 2022-2')]}/>

export const CurrencyInput = <NumberInput source="monto_recibido" fullWidth defaultValue={0}
                                          helperText={"Solo se acepta moneda nacional (pesos mexicanos). Convierta al cambio actual."}
                                          InputProps={{
                                              startAdornment: (<InputAdornment position="start">
                                                  $
                                              </InputAdornment>), endAdornment: (<InputAdornment position="end">
                                                  MXN
                                              </InputAdornment>)
                                          }}/>

export const KindOfAcademicMobilityInput = <SelectInput source="tipo_de_movilidad_académica" choices={[{
    id: 'DOCENCIA',
    name: 'DOCENCIA'
}, {id: 'ESTANCIA SABATICA', name: 'ESTANCIA SABATICA'}, {
    id: 'ESTANCIA DE INVESTIGACION',
    name: 'ESTANCIA DE INVESTIGACION'
}]} fullWidth/>


export const KindOfExchangeStudent =     <SelectInput source="tipo_de_intercambio_estudiantil" choices={[
    { id: 'PASANTIA', name: 'PASANTIA' },
    { id: 'CURSO DE GRADO ESTUDIANTIL', name: 'CURSO DE GRADO ESTUDIANTIL' },
    { id: 'PRACTICAS PROFESIONALES', name: 'PRACTICAS PROFESIONALES' },
    { id: 'ESTANCIA DE DOBLE GRADO', name: 'ESTANCIA DE DOBLE GRADO' }
]} fullWidth />

export const AcademicUnitAutocompleteInput = <ReferenceInput source="unidad_académica_id" reference="academic_unit">
    <AutocompleteInput optionText="nombre" optionValue="id" label="Unidad académica" fullWidth/>
</ReferenceInput>
import {AutocompleteInput, NumberInput, ReferenceInput, SelectInput} from "react-admin";
import * as React from "react";
import {InputAdornment} from "@mui/material";

export const DegreeLevelInput = <SelectInput source="nivel_de_estudios"
                                             choices={[{id: 'LICENCIATURA', name: 'LICENCIATURA'}, {
                                                 id: 'ESPECIALIDAD',
                                                 name: 'ESPECIALIDAD'
                                             }, {id: 'MAESTRIA', name: 'MAESTRIA'}, {
                                                 id: 'DOCTORADO',
                                                 name: 'DOCTORADO'
                                             }]} fullWidth/>;

export const SexInput = <SelectInput source="sexo" choices={[{id: 'MASCULINO', name: 'MASCULINO'}, {
    id: 'FEMININO',
    name: 'FEMININO'
},]} fullWidth/>

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
    { id: 'CURSO DE GRADO ESTUDIANTIL', name: 'CURSO DE GRADO ESTUDIANTIL' }
]} fullWidth />

export const AcademicUnitAutocompleteInput = <ReferenceInput source="unidad_académica_id" reference="academic_unit">
    <AutocompleteInput optionText="nombre" optionValue="id" label="Unidad académica" fullWidth/>
</ReferenceInput>
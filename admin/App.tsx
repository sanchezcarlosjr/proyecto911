import { fetchUtils, Admin, Resource, TextInput, ListGuesser, FilterButton, TopToolbar, CreateButton, ExportButton } from 'react-admin';
import simpleRestProvider from 'ra-data-simple-rest';
import {theme} from "./Theme";
import {
    IncomeAcademicMobilityCreate,
    IncomeAcademicMobilityEdit
} from "./income_academic_mobilities";
import { i18nProvider } from './i18nProvider';

const httpClient = (url: string, options: any = {}) => {
    options.headers = new Headers({ Accept: 'application/json', 'Authorization': '' });
    return fetchUtils.fetchJson(url, options);
};

const dataProvider = simpleRestProvider('/api', httpClient, 'Content-Range');

const ListActions = () => (
    <TopToolbar>
        <FilterButton/>
        <CreateButton/>
        <ExportButton/>
    </TopToolbar>
);

const Filter = [
    <TextInput label="Búsqueda" source="q" alwaysOn />
];

const App = () => (
  <Admin theme={theme} dataProvider={dataProvider} i18nProvider={i18nProvider}>
      <Resource options={{label: "Movilidad A. de entrada"}} name="income_academic_mobilities"  list={<ListGuesser filters={Filter} actions={<ListActions/>}/>} create={IncomeAcademicMobilityCreate} edit={IncomeAcademicMobilityEdit} />
      <Resource options={{label: "Movilidad A. de salida"}} name="outcome_academic_mobilities"  list={ListGuesser} />
  </Admin>
);

export default App;

import {
    fetchUtils,
    Admin,
    Resource,
    TextInput,
    ListGuesser,
    FilterButton,
    TopToolbar,
    CreateButton,
    ExportButton
} from 'react-admin';
import simpleRestProvider from 'ra-data-simple-rest';
import {theme} from "./Theme";
import Income_academic_mobility from "./income_academic_mobilities";
import Outcome_academic_mobility from "./outcome_academic_mobilities";
import outcome_exchange_student from "./outcome_exchange_student";
import income_exchange_student from "./income_exchange_student";
import agreements from "./agreements";

import {i18nProvider} from './i18nProvider';
import {authProvider} from "./auth_provider";

const httpClient = (url: string, options: any = {}) => {
    options.headers = new Headers({Accept: 'application/json', 'Authorization': localStorage.getItem('token') ?? ""});
    return fetchUtils.fetchJson(url, options);
};

const dataProvider = simpleRestProvider('/api', httpClient, 'Content-Range');


const App = () => (
    <Admin authProvider={authProvider} theme={theme} dataProvider={dataProvider} i18nProvider={i18nProvider} requireAuth disableTelemetry>
        <Resource name="income_academic_mobilities" {...Income_academic_mobility}/>
        <Resource name="outcome_academic_mobility" {...Outcome_academic_mobility}/>
        <Resource name="outcome_exchange_student" {...outcome_exchange_student}/>
        <Resource name="income_exchange_student" {...income_exchange_student}/>
        <Resource name="agreements" {...agreements}/>
    </Admin>
);

export default App;

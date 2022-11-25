import type {NextPage} from "next";
import dynamic from "next/dynamic";
import Head from "next/head";

const App = dynamic(() => import("../admin/App"), {ssr: false});

const Home: NextPage = () => {
    return <>
        <Head>
            <title>Proyecto911 UABC - Coordinación General de Vinculación y Cooperación Académica (CGVCA)</title>
            <meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no"/>
            <meta name="description"
                  content="Sistema de captura del Formato 911 para Coordinación General de Vinculación y Cooperación Académica de la Universidad Autónoma de Baja California (UABC), desarrollado por los estudiantes de ciencias computacionales -cimarrones-. Puedes encontrar la movilidad interna y convenios" />
            <meta property="og:locale" content="es_MX"/>
            <meta property="og:title" content="Proyecto911 UABC - Coordinación General de Vinculación y Cooperación Académica (CGVCA)" />
            <meta property="og:url" content="https://proyecto911.ens.uabc.mx/" />
            <meta property="og:site_name" content="proyecto911" />
        </Head>
        <App/>
    </>;
};

export default Home;

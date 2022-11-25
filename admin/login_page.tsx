import React from 'react';
import { Login } from 'react-admin';
import {LoginForm} from "./login_form";


export const loginPage = () => {
    // @ts-ignore
    return <Login backgroundImage={"/uabc.jpg"}  children={<LoginForm />} />;
}

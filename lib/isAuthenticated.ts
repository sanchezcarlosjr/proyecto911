import {Cypher} from "./Cypher";

export async function isAuthenticated(username: string, password: string): Promise<boolean> {
    const cypher = new Cypher();
    const resource = `${process.env.API}/escolar/alumno/auth?json={ "usuario": "${username}", "contrasena": "${cypher.encrypt(password)}" }`;
    return await fetch(resource, {
        method: 'POST',
        headers: {
            'Authorization': process.env.API_AUTHORIZATION ?? ""
        }
    }).then(response => !!response.text());
}
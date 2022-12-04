import type { NextApiRequest, NextApiResponse } from 'next'
import { Cypher } from "../../lib/Cypher";
import { sign } from "../../lib/sign";
import userController from '../../controllers/user'

interface LoginResponse {
    token: string;
}

interface ErrorResponse {
    message: string;
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<LoginResponse | ErrorResponse>
) {
    try {
        switch (req.method) {
            case 'POST':
                const cypher = new Cypher();
                const resource = `${process.env.API}/escolar/alumno/auth?json={ "usuario": "${req.body.username}", "contrasena": "${cypher.encrypt(req.body.password)}" }`;
                const response = await fetch(resource, {
                    method: 'POST',
                    headers: {
                        'Authorization': process.env.API_AUTHORIZATION ?? ""
                    }
                }).then(response => response.text());
                const user = await userController.getUser(req.body.username);
                const authorized = !!response && user.can('login');
                if (!authorized) {
                    return res.status(401).json({ message: "ra.auth.sign_in_error" });
                }
                const permissions = user.getPermissions();
                const token = await sign({ email: `${req.body.username}@uabc.edu.mx`, claims: permissions}) as string;
                return res.status(201).json({ token });
            default:
                return res.status(406).json({message: "ra.notification.http_error"});
        }
    } catch (error) {
        console.warn(new Date(), error);
        return res.status(500).json({ message: "ra.notification.http_error" });
    }
}

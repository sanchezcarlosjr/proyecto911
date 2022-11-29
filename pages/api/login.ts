import type { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from '../../lib/ dbConnect';
import sessionController from "../../controllers/session";
import {Cypher} from "../../lib/Cypher";
import {sign} from "../../lib/sign";

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
                if (response === "false") {
                    return res.status(401).json({ message: "ra.auth.sign_in_error" });
                }
                const token = await sign({email: `${req.body.username}@uabc.edu.mx`}) as string;
                return res.status(201).json({ token });
            default:
                return res.status(406).json({message: "ra.notification.http_error"});
        }
    } catch (error) {
        console.warn(new Date(), error);
        return res.status(500).json({ message: "ra.notification.http_error" });
    }
}

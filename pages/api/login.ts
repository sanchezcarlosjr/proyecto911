import type {NextApiRequest, NextApiResponse} from 'next'
import {sign} from "../../lib/sign";
import userController from '../../controllers/user'
import {isAuthenticated} from "../../lib/isAuthenticated";

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
                const authenticated = await isAuthenticated(req.body.username, req.body.password);
                const user = await userController.getUser(req.body.username);
                const authorized = authenticated && user.can('login');
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
        console.warn(error);
        return res.status(401).json({ message: "ra.auth.sign_in_error" });
    }
}

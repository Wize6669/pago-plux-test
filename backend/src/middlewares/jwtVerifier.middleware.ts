import {NextFunction, Request, Response} from 'express';
import jwt from 'jsonwebtoken';
import {config} from '../config';
import {IUserDTO} from '../../models/user'

declare module 'express' {
    interface Request {
        user?: IUserDTO;
    }
}

const jwtVerifierMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const jwtSecretKey = config['JWT_SECRET_KEY'];

    if (!jwtSecretKey) {
        throw new Error('Falta la llave secreta para generar los jwts.');
    }
    
    if (!req.headers.authorization) {
        res.status(401).send('Unauthorized: Authorization header missing');

        return;
    }

    const token = req.headers.authorization.split(' ')[1];
    if (token === undefined) {
        res.status(401).send('Unauthorized: Access is denied due to missing or invalid token');

        return;
    }

    jwt.verify(token, jwtSecretKey, (error, decodedToken) => {
        if (error) {
            res.status(401).send('Unauthorized: Access is denied due to missing or invalid token');

            return;
        }

        if (typeof decodedToken === 'object' && decodedToken !== null) {
            req.user = decodedToken as IUserDTO;
        }

        next();
    });
};

export { jwtVerifierMiddleware };
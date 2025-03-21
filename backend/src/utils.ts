import {config} from './config';
import jwt from 'jsonwebtoken';
import {IUserDTO} from '../models/user';
import {PrismaClientKnownRequestError} from '@prisma/client/runtime/library';

const generateJWT = (user: IUserDTO) => {
    const jwtSecretKey = config['JWT_SECRET_KEY'];

    if (!jwtSecretKey) {
        throw new Error('Falta la llave secreta para generar los jwts.');
    }

    return jwt.sign(user, jwtSecretKey, {expiresIn: 12600});
};

const processPrismaError = (error: Error | string | unknown) => {
    if (error instanceof PrismaClientKnownRequestError) {
        const fieldName = error.meta?.field_name;

        return {error: `Prisma\n campo: ${fieldName} - Mensaje: ${error.message}`, code: 400};
    }

    return {error: 'Se produjo un error con el servidor', code: 500};
};

export {generateJWT, processPrismaError};

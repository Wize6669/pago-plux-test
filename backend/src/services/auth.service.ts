import {PrismaClient} from '@prisma/client';
import bcrypt from 'bcryptjs';
import {ILogin, IRegister} from "../../models/user";
import {generateJWT, processPrismaError} from "../utils";

const prisma = new PrismaClient();

const registerService = async (user: IRegister) => {
    try {
        const existingUser = await prisma.user.findFirst({
            where: {
                email: user.email
            },
        });

        if (existingUser) {
            return {error: 'El/La usuario ya existe', code: 409};
        }

        const hashedPassword = await bcrypt.hash(user.password, 10);

        const newUser = await prisma.user.create({
            data: {
                name: user.name,
                surname: user.surname,
                email: user.email,
                password: hashedPassword
            }
        });

        return {
            id: newUser.id
        };
    } catch (e) {
        processPrismaError(e);
    }
};

const longinService = async (user: ILogin) => {
    try {
        const userExist = await prisma.user.findFirst({
            where: {
                email: user.email,
            }
        });

        if (!userExist) {
            return {error: 'Credenciales inválidas', code: 400};
        }

        const isCorrectPassword = await bcrypt.compare(user.password, userExist.password);

        if (!isCorrectPassword) {
            return {error: 'Credenciales inválidas', code: 400};
        }

        const userDTO = {
            id: userExist.id,
            name: userExist.name,
            surname: userExist.surname,
            email: user.email
        }

        const token = generateJWT(userDTO);

        return {
            ...userDTO,
            token
        };
    } catch (e) {
        processPrismaError(e);
    }
};

export {registerService, longinService};

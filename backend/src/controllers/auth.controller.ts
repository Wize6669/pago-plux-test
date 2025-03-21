import {Request, Response} from 'express';
import {longinService, registerService} from '../services/auth.service';

const registerController = async (req: Request, res: Response): Promise<void> => {
    const {name, surname, email, password} = req.body;
    const result = await registerService({name, surname, email, password});

    if (!result) {
        res.status(500).json({error: 'Error al crear el usuario. No se recibió resultado de servicio.'});
        return;
    }

    if ('error' in result) {
        const code = result.code ?? 500;
        res.status(code).json({error: result.error});
        return;
    }

    res.status(201).json({message: 'Usuario creado con éxito'});
};

const loginController = async (req: Request, res: Response): Promise<void> => {
    const {email, password} = req.body;
    const result = await longinService({email, password});

    if (!result) {
        res.status(500).json({error: 'Error al crear el usuario. No se recibió resultado de servicio.'});
        return;
    }

    if ('error' in result) {
        const code = result.code ?? 500;
        res.status(code).json({error: result.error});
        return;
    }

    res.status(200).json(result);
};

export {registerController, loginController};

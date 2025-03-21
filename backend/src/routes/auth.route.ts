import {Router} from 'express';
import {loginSchema, registerSchema} from '../schemasJoi/auth.schema';
import {loginController, registerController} from '../controllers/auth.controller';
import {schemaVerifier} from '../middlewares/schemaVerifier.middleware';

const router = Router();

router.post('/register', schemaVerifier({body: registerSchema}), registerController);
router.post('/login', schemaVerifier({body: loginSchema}), loginController);

export {router};
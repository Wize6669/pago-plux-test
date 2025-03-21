import {Router} from 'express';
import {getTransactionByIdController} from '../controllers/pagoPlux.controller';
import {schemaVerifier} from '../middlewares/schemaVerifier.middleware';
import {transactionQueries} from "../schemasJoi/pagoPlux.schema";

const router = Router();

router.get('/getTransactionByIdStateResource', schemaVerifier({query: transactionQueries}),getTransactionByIdController);

export {router};
import express from 'express';
import {Response} from 'express';
import {config} from './config';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import specs from './swagger/swagger';

const app = express();
const hostFrontEnd = config['HOST_FRONT_END'];

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(
    cors({
        origin: hostFrontEnd,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    })
);

// Routes
import {router as authRouter} from './routes/auth.route';
import {router as pagoPluxRouter} from "./routes/pagoPlux.route";

//Middleware globales
import {jwtVerifierMiddleware} from "./middlewares/jwtVerifier.middleware";


// End points
app.use('/health', (_, res: Response) => {
    res.send('Healthy');
});
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
app.use('/api/v1', authRouter);
app.use('/api/v1/transactions', jwtVerifierMiddleware,pagoPluxRouter);

export {app};
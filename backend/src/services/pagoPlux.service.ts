import axios from 'axios';
import {config} from "../config";

export const pagoPluxService = axios.create({
    baseURL: config['BASE_URL_PAGO_PLUX'],
    auth: {
        username: config['PAGO_PLUX_USERNAME'],
        password: config['PAGO_PLUX_PASSWORD'],
    },
    headers: {
        'Accept': 'application/json',
    },
});

const getTransactionByIdService = async (transactionId: string) => {
    try {
        const response = await pagoPluxService.get(`/integrations/getTransactionByIdStateResource?idTransaction=${transactionId}`);
        const data = response.data;

        if(data.code !== 0) {
            if (data.description === 'Transacción no encontrada.') {
                return {error: 'Transacción no encontrada.', code: 404};
            }

            return {error: data.description, code: 400}
        }

        return data;
    } catch (e) {
        throw e;
    }
}

export {getTransactionByIdService};

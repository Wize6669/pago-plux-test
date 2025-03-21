import { Request, Response } from 'express';
import { getTransactionByIdService } from "../services/pagoPlux.service";

const getTransactionByIdController = async (req: Request, res: Response): Promise<void> => {
    try {
        const { transactionId } = req.query;

        const transactionData = await getTransactionByIdService(String(transactionId));

        if ('error' in transactionData) {
            const code = transactionData.code ?? 500;
            res.status(code).json({ error: transactionData.error });
            return;
        }

        res.status(200).json(transactionData);
    } catch (error) {
        console.error('Error fetching transaction:', error);
        res.status(500).json({ error: 'Failed to fetch transaction details' });
    }
};

export { getTransactionByIdController };

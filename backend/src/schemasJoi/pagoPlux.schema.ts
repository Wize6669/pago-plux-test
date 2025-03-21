import Joi from 'joi';

const transactionQueries = Joi.object({
    transactionId: Joi.string().required().messages({
        'string.base': 'El ID de la transacción debe ser un texto.',
        'any.required': 'El ID de la transacción es obligatorio.',
        'string.empty': 'El ID de la transacción no puede estar vacío.',
    })
});


export {transactionQueries}
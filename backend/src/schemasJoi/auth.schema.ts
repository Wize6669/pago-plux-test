import Joi from 'joi';

const registerSchema = Joi.object({
    name: Joi.string()
        .min(2)
        .max(50)
        .required()
        .messages({
            'string.min': 'El nombre debe tener al menos 2 caracteres.',
            'string.max': 'El nombre no debe exceder los 50 caracteres.',
            'string.empty': 'El nombre no puede estar vacío.',
            'any.required': 'El nombre es obligatorio.'
        }),
    surname: Joi.string()
        .min(2)
        .max(50)
        .required()
        .messages({
            'string.min': 'El apellido debe tener al menos 2 caracteres.',
            'string.max': 'El apellido no debe exceder los 50 caracteres.',
            'string.empty': 'El apellido no puede estar vacío.',
            'any.required': 'El apellido es obligatorio.'
        }),
    email: Joi.string()
        .email()
        .required()
        .messages({
            'string.email': 'El correo electrónico no es válido.',
            'any.empty': 'El correo electrónico no puede estar vacío.',
            'any.required': 'El correo electrónico es obligatorio.'
        }),
    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9!@#$%^&*()\\-_+=\\[\\]{}|;:,.<>?]{3,30}$'))
        .required()
        .messages({
            'string.pattern.base': 'La contraseña debe tener entre 3 y 30 caracteres y puede incluir letras, números y símbolos especiales.',
            'string.empty': 'La contraseña no puede estar vacía.',
            'any.required': 'La contraseña es obligatoria.'
        }),
});

const loginSchema = Joi.object({
    email: Joi.string()
        .email()
        .required()
        .messages({
            'string.email': 'El correo electrónico no es válido.',
            'string.empty': 'El correo electrónico no puede estar vacío.',
            'any.required': 'El correo electrónico es obligatorio.'
        }),
    password: Joi.string()
        .required()
        .messages({
            'string.empty': 'La contraseña no puede estar vacía.',
            'any.required': 'La contraseña es obligatoria.'
        })
});

export {registerSchema, loginSchema};
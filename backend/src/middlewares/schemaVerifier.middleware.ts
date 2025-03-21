import {Request, Response, NextFunction} from 'express';
import {ValidationError} from 'joi';
import {RequestValues, SchemasConfig} from '../../models/schemaJoi';

function getRequestPart(req: Request, requestPart: RequestValues) {
    return req[requestPart];
}

function setRequestPart(
    req: Request,
    requestPart: RequestValues,
    value: unknown
): void {
    req[requestPart] = value;
}

const schemaVerifier = (schemas: SchemasConfig) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            for (const [requestPart, schema] of Object.entries(schemas)) {
                const requestPartType = requestPart as RequestValues;
                if (schema != null) {
                    const requestPart = getRequestPart(req, requestPartType);
                    const value = await schema.validateAsync(requestPart, {
                        abortEarly: false,
                    });
                    if (Object.values(RequestValues).includes(requestPartType)) {
                        setRequestPart(req, requestPartType, value);
                    }
                }
            }
            next();
        } catch (error) {
            if (error instanceof ValidationError) {
                const errors = error.details.map(({message, path}) => ({
                    message,
                    path: path.join('.')
                }));
                if (errors.length > 1) {
                    res.status(400).json({errors: errors});
                    return;
                }
                res.status(400).json({error: errors[0]});
                return;
            } else {
                next(error);
            }
        }
    };
}

export {schemaVerifier}
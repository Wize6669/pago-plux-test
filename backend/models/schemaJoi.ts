import Joi from 'joi';

export enum RequestValues {
    Body = "body",
    Query = "query",
    Headers = "headers",
    Params = "params",
}

export interface SchemasConfig {
    body?: Joi.ObjectSchema;
    query?: Joi.ObjectSchema;
    headers?: Joi.ObjectSchema;
    params?: Joi.ObjectSchema;
}
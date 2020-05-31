import Ajv, { Options as AjvOptions } from 'ajv';
import { createValidator as createRequestValidator, SchemaCollection, ValidatorOptions } from 'express-ajv';

export const defaultAjvOptions: AjvOptions = {
    allErrors: true,
    coerceTypes: true,
    format: 'full',
    useDefaults: true,
};

const ajv = new Ajv(defaultAjvOptions);
const options: ValidatorOptions = { ajv };

export function createValidator(schemas: SchemaCollection) {
    return createRequestValidator(schemas, options);
}

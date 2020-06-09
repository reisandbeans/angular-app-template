import ajv, { ErrorObject } from 'ajv';
import { get, map } from 'lodash';
import { ErrorCode } from '@server/lib/exceptions/error-code';
import { InvalidParametersError, ErrorDetail } from '@server/lib/exceptions';
import { ErrorAdapter } from './error-adapter';

const keywordMap: { [key: string]: ErrorCode | undefined } = {
    required: ErrorCode.MissingRequiredParameter,
};

export const toApplicationError: ErrorAdapter = (ajvError: ajv.ValidationError) => {
    return new InvalidParametersError(
        map(ajvError.errors, mapAjvError),
    );
};

function mapAjvError(ajvError: ErrorObject): ErrorDetail {
    let { message } = ajvError;
    const code = keywordMap[ajvError.keyword] || ErrorCode.InvalidParameters;
    const params = get(ajvError, 'params', {}) as any;
    const fieldName = (ajvError.dataPath || params.property || params.missingProperty ||
        params.additionalProperties || '').replace('.', '');
    if (ajvError.keyword === 'enum') {
        const allowedValues = get(ajvError, 'params.allowedValues');
        message += `: ${allowedValues}`;
    }

    return {
        code,
        message,
        field: fieldName,
    } as ErrorDetail;
}

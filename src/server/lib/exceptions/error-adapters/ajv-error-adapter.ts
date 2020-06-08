import ajv, { ErrorObject } from 'ajv';
import { get, map } from 'lodash';
import { ErrorCode } from '@server/lib/exceptions/error-code';
import { ErrorMessages } from '@server/lib/exceptions/error-messages';
import { ApplicationError, ErrorDetail } from '../application-error';
import { ErrorAdapter } from './error-adapter';

const keywordMap: { [key: string]: ErrorCode | undefined } = {
    required: ErrorCode.MissingRequiredParameter,
};

export const toApplicationError: ErrorAdapter = (ajvError: ajv.ValidationError) => {
    return new ApplicationError(
        ErrorCode.InvalidParameters,
        ErrorMessages.InvalidParameters,
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

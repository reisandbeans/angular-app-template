import ajv, { ErrorObject } from 'ajv';
import { get, map } from 'lodash';
import { ApiError, ErrorCode, ErrorDetail, ErrorMessages } from './api-error';
import { ApiResponse } from './api-response';

const keywordMap: { [key: string]: ErrorCode | undefined } = {
    required: ErrorCode.MissingRequiredParameter,
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
    };
}

export function fromAjvError(ajvError: ajv.ValidationError): ApiResponse {
    const apiError = new ApiError(
        ErrorCode.InvalidParameters,
        ErrorMessages.InvalidParameters,
        map(ajvError.errors, mapAjvError)
    );
    return ApiResponse.BadRequest(apiError);
}

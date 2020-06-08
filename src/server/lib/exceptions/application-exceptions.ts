import { isArray } from 'lodash';
import { ApplicationError, ErrorDetail } from './application-error';
import { ErrorCode } from '@server/lib/exceptions/error-code';
import { ErrorMessages } from '@server/lib/exceptions/error-messages';

export function invalidParameters(details: ErrorDetail | ErrorDetail[], message?: string): ApplicationError {
    const normalizedErrors = isArray(details) ? details : [details];
    return new ApplicationError(
        ErrorCode.InvalidParameters,
        message || ErrorMessages.InvalidParameters,
        normalizedErrors,
    );
}

export function entityNotFound(message?: string): ApplicationError {
    return new ApplicationError(
        ErrorCode.EntityNotFound,
        message || ErrorMessages.NotFound,
    );
}

export function unauthorized(): ApplicationError {
    return new ApplicationError(
        ErrorCode.Unauthorized,
        ErrorMessages.Unauthorized,
    );
}

export function permissionDenied(message?: string): ApplicationError {
    return new ApplicationError(
        ErrorCode.Forbidden,
        message || ErrorMessages.Forbidden,
    );
}

export function unexpectedError(error: any): ApplicationError {
    const errors: ErrorDetail[] = [
        {
            code: ErrorCode.UnexpectedError,
            message: error.message,
            field: 'originalError',
        },
    ];
    return new ApplicationError(
        ErrorCode.UnexpectedError,
        ErrorMessages.UnexpectedError,
        errors,
    );
}

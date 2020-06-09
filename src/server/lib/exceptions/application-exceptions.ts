import statusCodes from 'http-status-codes';
import { isArray } from 'lodash';
import { ApplicationError, ErrorDetail } from './application-error';
import { ErrorCode } from '@server/lib/exceptions/error-code';
import { ErrorMessages } from '@server/lib/exceptions/error-messages';

export class InvalidParametersError extends ApplicationError {
    constructor(details: ErrorDetail | ErrorDetail[], message?: string) {
        const normalizedErrors = isArray(details) ? details : [details];
        super(
            ErrorCode.InvalidParameters,
            message || ErrorMessages.InvalidParameters,
            normalizedErrors,
        );
    }

    getHttpStatusCode(): any {
        return statusCodes.BAD_REQUEST;
    }
}

export class NotFoundError extends ApplicationError {
    constructor(message?: string) {
        super(
            ErrorCode.EntityNotFound,
            message || ErrorMessages.NotFound,
        );
    }

    getHttpStatusCode(): any {
        return statusCodes.NOT_FOUND;
    }
}

export class UnauthorizedError extends ApplicationError {
    constructor(message?: string) {
        super(
            ErrorCode.Unauthorized,
            message || ErrorMessages.Unauthorized,
        );
    }

    getHttpStatusCode(): any {
        return statusCodes.UNAUTHORIZED;
    }
}

export class InsufficientPrivilegesError extends ApplicationError {
    constructor(message?: string) {
        super(
            ErrorCode.Forbidden,
            message || ErrorMessages.Forbidden,
        );
    }

    getHttpStatusCode(): any {
        return statusCodes.FORBIDDEN;
    }
}

export class UnexpectedError extends ApplicationError {
    constructor(error: any) {
        const errors: ErrorDetail[] = [
            {
                code: ErrorCode.UnexpectedError,
                message: error.message,
                field: 'originalError',
            },
        ];
        super(
            ErrorCode.UnexpectedError,
            ErrorMessages.UnexpectedError,
            errors,
        );
    }
}


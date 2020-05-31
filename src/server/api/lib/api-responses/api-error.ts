import { serverConfig } from '@server/config/server-config';

export class ApiError extends Error {
    readonly code: ErrorCode;
    readonly message: string;
    readonly errors?: ErrorDetail[];

    constructor(code: ErrorCode, message: string, errors?: ErrorDetail[]) {
        super(message);
        this.code = code;
        this.message = message;
        this.errors = errors;
    }

    toJson() {
        const errorObject: { [key: string]: any } = {
            code: this.code,
            message: this.message,
            errors: this.errors
        };

        if (serverConfig.isProduction) {
            errorObject.stack = this.stack;
        }

        return errorObject;
    }
}

export interface ErrorDetail {
    field?: string;
    code: string;
    message: string;
}

export const enum ErrorMessages {
    Forbidden = 'You don\'t have access to the requested resource',
    InvalidParameters = 'Invalid parameters provided',
    NotFound = 'Resource not found',
    Unauthorized = 'Authentication required',
    UnexpectedError = 'Unexpected error',
}

export enum ErrorCode {
    EntityNotFound = 'entityNotFound',
    Forbidden = 'accessDenied',
    InvalidParameters = 'invalidParameters',
    MissingRequiredParameter = 'missingRequiredParameter',
    Unauthorized = 'authenticationRequired',
    UnexpectedError= 'unexpectedError',
}


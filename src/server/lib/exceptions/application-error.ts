import { serverConfig } from '@server/config/server-config';
import { ErrorCode } from '@server/lib/exceptions/error-code';
import statusCodes from 'http-status-codes';

export class ApplicationError extends Error {
    readonly code: ErrorCode;
    readonly message: string;
    readonly errors?: ErrorDetail[];

    constructor(code: ErrorCode, message: string, errors?: ErrorDetail[]) {
        super(message);
        this.code = code;
        this.message = message;
        this.errors = errors;
    }

    getHttpStatusCode() {
        return statusCodes.INTERNAL_SERVER_ERROR;
    }

    toJson() {
        const errorObject: { [key: string]: any } = {
            code: this.code,
            message: this.message,
            errors: this.errors,
        };

        if (!serverConfig.isProduction) {
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

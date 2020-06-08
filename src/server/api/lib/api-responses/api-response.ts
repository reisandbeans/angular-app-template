import * as HttpStatusCodes from 'http-status-codes';
import { Response } from 'express';
import { ApplicationError } from '@server/lib/exceptions/application-error';
import { getStatusForErrorCode } from '@server/api/lib/api-responses/error-code-status-map';

export class ApiResponse {
    readonly status: number;
    readonly success: boolean;
    readonly data?: object;
    readonly error?: ApplicationError;

    constructor(status: number, data?: object, error?: ApplicationError) {
        this.status = status;
        this.data = data;
        this.error = error;
        this.success = this.isSuccessResponse();
    }

    static Ok(data?: object) {
        return new ApiResponse(HttpStatusCodes.OK, data);
    }

    static Created(data?: object) {
        return new ApiResponse(HttpStatusCodes.CREATED, data);
    }

    static NoContent() {
        return new ApiResponse(HttpStatusCodes.NO_CONTENT);
    }

    static TooManyRequests() {
        return new ApiResponse(HttpStatusCodes.TOO_MANY_REQUESTS);
    }

    static fromApplicationError(error: ApplicationError) {
        const status = getStatusForErrorCode(error.code);
        return new ApiResponse(status, undefined, error);
    }

    toJson() {
        return {
            data: this.data,
            error: this.error && this.error.toJson(),
        };
    }

    send(res: Response) {
        res.status(this.status).json(this.toJson());
    }

    private isSuccessResponse() {
        return this.status < 400;
    }
}

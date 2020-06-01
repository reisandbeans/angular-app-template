import * as HttpStatusCodes from 'http-status-codes';
import { Response } from 'express';
import { ApiError, ErrorCode, ErrorDetail, ErrorMessages } from './api-error';

export class ApiResponse {
    readonly status: number;
    readonly success: boolean;
    readonly data?: object;
    readonly error?: ApiError;

    constructor(status: number, data?: object, error?: ApiError) {
        this.status = status;
        this.data = data;
        this.error = error;
        this.success = this.isSuccessResponse();
    }

    static Ok(data?: object) {
        return new ApiResponse(HttpStatusCodes.OK, data);
    }

    static Created() {
        return new ApiResponse(HttpStatusCodes.CREATED);
    }

    static NoContent() {
        return new ApiResponse(HttpStatusCodes.NO_CONTENT);
    }

    static BadRequest(error: ApiError) {
        return new ApiResponse(HttpStatusCodes.BAD_REQUEST, undefined, error);
    }

    static Unauthorized() {
        const error = new ApiError(ErrorCode.Unauthorized, ErrorMessages.Unauthorized);
        return new ApiResponse(HttpStatusCodes.UNAUTHORIZED, undefined, error);
    }

    static Forbidden() {
        const error = new ApiError(ErrorCode.Forbidden, ErrorMessages.Forbidden);
        return new ApiResponse(HttpStatusCodes.FORBIDDEN, undefined, error);
    }

    static NotFound(message?: string) {
        const error = new ApiError(ErrorCode.EntityNotFound, message || ErrorMessages.NotFound);
        return new ApiResponse(HttpStatusCodes.NOT_FOUND, undefined, error);
    }

    static TooManyRequests() {
        return new ApiResponse(HttpStatusCodes.TOO_MANY_REQUESTS);
    }

    static ServerError(error: any) {
        const errors: ErrorDetail[] = [{
            code: ErrorCode.UnexpectedError,
            message: error.message,
            field: 'originalError',
        }];
        const serverError = new ApiError(ErrorCode.UnexpectedError, ErrorMessages.UnexpectedError, errors);
        return new ApiResponse(HttpStatusCodes.INTERNAL_SERVER_ERROR, undefined, serverError);
    }

    private isSuccessResponse() {
        return this.status < 400;
    }

    toJson() {
        return {
            data: this.data,
            error: this.error.toJson(),
        };
    }

    send(res: Response) {
        res.status(this.status).json(this.toJson());
    }
}

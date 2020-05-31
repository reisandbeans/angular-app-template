import ajv from 'ajv';
import { NextFunction, Request, Response } from 'express';
import { fromAjvError } from '../api-responses/error-transformer';
import { ApiResponse } from '../api-responses/api-response';

export function errorHandler(error: any, req: Request, res: Response, next: NextFunction) {
    if (error instanceof ApiResponse) {
        return error.send(res);
    }

    if (error instanceof  ajv.ValidationError) {
        return fromAjvError(error).send(res);
    }

    ApiResponse.ServerError(error).send(res);
}

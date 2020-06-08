import ajv from 'ajv';
import { NextFunction, Request, Response } from 'express';
import { ApiResponse } from '../api-responses/api-response';
import { ApplicationError } from '@server/lib/exceptions/application-error';
import { mapAjvError } from '@server/lib/exceptions/error-adapters';
import { unexpectedError } from '@server/lib/exceptions/application-exceptions';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function errorHandler(error: any, req: Request, res: Response, next: NextFunction) {
    let mappedError: ApplicationError;

    if (error instanceof ApplicationError) {
        mappedError = error;
    } else if (error instanceof ajv.ValidationError) {
        mappedError = mapAjvError(error);
    } else {
        mappedError = unexpectedError(error);
    }

    ApiResponse.fromApplicationError(mappedError).send(res);
}

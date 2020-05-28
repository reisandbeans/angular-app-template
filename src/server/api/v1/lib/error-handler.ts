import { NextFunction, Request, Response } from 'express';

export function errorHandler(error: any, req: Request, res: Response, next: NextFunction) {
    const code = error.code || 500;
    const message = error.message || 'Unexpected error';
    res.status(code).send({ error: message });
}

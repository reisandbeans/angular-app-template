import { Request, Response } from 'express';

export function helloWorld(req: Request, res: Response) {
    const {
        body: {
            sender
        }
    } = req;
    res.status(200).send({ success: true, data: { sender } });
}

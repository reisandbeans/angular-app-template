import { Router, Request, Response } from 'express';

export function mount(router: Router) {
    router.all('/health-check', sendResponse);
}

function sendResponse(req: Request, res: Response) {
    const server = (req.connection as any).server;
    const responseCode = server.isShuttingDown ? 500 : 200;
    res.status(responseCode).end();
}

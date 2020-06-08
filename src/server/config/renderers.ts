import { Request, RequestHandler, Response } from 'express';
import { APP_BASE_HREF } from '@angular/common';
import { serverConfig } from './server-config';

export function renderIndex(req: Request, res: Response) {
    res.render('index', {
        req,
        providers: [{ provide: APP_BASE_HREF, useValue: req.baseUrl }],
    });
}

export function sendIndex(req: Request, res: Response) {
    const { distFolderPath } = serverConfig;
    res.sendFile(`${distFolderPath}/index.html`);
}

export function getRenderer(): RequestHandler {
    return serverConfig.useSsr ? renderIndex : sendIndex;
}

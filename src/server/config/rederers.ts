import { Request, RequestHandler, Response } from 'express';
import { APP_BASE_HREF } from '@angular/common';
import { serverConfig } from './server-config';

const { useSsr, distFolderPath } = serverConfig;

export function renderIndex(req: Request, res: Response) {
    res.render('index', {
        req,
        providers: [{ provide: APP_BASE_HREF, useValue: req.baseUrl }],
    });
}

export function sendIndex(req: Request, res: Response) {
    res.sendFile(`${distFolderPath}/index.html`);
}

export function getRenderer(): RequestHandler {
    return useSsr ? renderIndex : sendIndex;
}

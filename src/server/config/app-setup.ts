import express, { Application, Request, Response } from 'express';
import bodyParser from 'body-parser';
import Router from 'express-promise-router';
import { ngExpressEngine } from '@nguniversal/express-engine';
import { APP_BASE_HREF } from '@angular/common';
import { mount } from '../api';
import { serverConfig } from './server-config';
import { RootServerModule } from '../server-side-rendering/root-server-module';

const { useSsr, distFolderPath } = serverConfig;
const renderer = useSsr
    ? (req: Request, res: Response) => res.render('index', { req, providers: [{ provide: APP_BASE_HREF, useValue: req.baseUrl }] })
    : (req: Request, res: Response) => res.sendFile(`${distFolderPath}/index.html`);

export function buildApp() {
    const app = express();
    setupMiddleware(app);
    bootEndpoints(app);
    serveStaticFiles(app);
    return app;
}

function serveStaticFiles(app: Application) {
    app.get('*.*', express.static(distFolderPath, {
        maxAge: '1y'
    }));

    app.get('*', renderer);
}

function setupMiddleware(app: Application) {
    if (useSsr) {
        app.engine('html', ngExpressEngine({
            bootstrap: RootServerModule,
        }));
    }

    app.set('view engine', 'html');
    app.set('views', distFolderPath);
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
}

function bootEndpoints(app: Application) {
    const router = Router();
    mount(router);
    app.use('/api', router);
}

import express, { Application, Request, Response } from 'express';
import bodyParser from 'body-parser';
import Router from 'express-promise-router';
import { ngExpressEngine } from '@nguniversal/express-engine';
import { APP_BASE_HREF } from '@angular/common';
import { resolve } from 'path';
import { mount } from '../api';
import { AppServerModule } from '../server-side-rendering/app-server-module';

const distFolder = resolve(__dirname, '../../../dist/client');
const useSsr = process.env.USE_SSR;
const renderer = useSsr
    ? (req: Request, res: Response) => res.render('index', { req, providers: [{ provide: APP_BASE_HREF, useValue: req.baseUrl }] })
    : (req: Request, res: Response) => res.sendFile(`${distFolder}/index.html`);

export function buildApp() {
    const app = express();
    setupMiddleware(app);
    bootEndpoints(app);
    serveStaticFiles(app);
    return app;
}

function serveStaticFiles(app: Application) {
    app.get('*.*', express.static(distFolder, {
        maxAge: '1y'
    }));

    app.get('*', renderer);
}

function setupMiddleware(app: Application) {
    if (useSsr) {
        app.engine('html', ngExpressEngine({
            bootstrap: AppServerModule,
        }));
    }

    app.set('view engine', 'html');
    app.set('views', distFolder);
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
}

function bootEndpoints(app: Application) {
    const router = Router();
    mount(router);
    app.use('/api', router);
}

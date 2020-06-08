import express, { Application } from 'express';
import bodyParser from 'body-parser';
import Router from 'express-promise-router';
import { ngExpressEngine } from '@nguniversal/express-engine';
import { mount } from '../api';
import { serverConfig } from './server-config';
import { RootServerModule } from '../server-side-rendering/root-server-module';
import { getRenderer } from '@server/config/renderers';

export function buildApp() {
    const app = express();
    setupMiddleware(app);
    bootEndpoints(app);
    serveStaticFiles(app);
    return app;
}

function serveStaticFiles(app: Application) {
    const { distFolderPath } = serverConfig;
    const renderer = getRenderer();
    app.get('*.*', express.static(distFolderPath, { maxAge: '1y' }));
    app.get('*', renderer);
}

function setupMiddleware(app: Application) {
    const { distFolderPath, useSsr } = serverConfig;
    if (useSsr) {
        app.engine('html', ngExpressEngine({ bootstrap: RootServerModule }));
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

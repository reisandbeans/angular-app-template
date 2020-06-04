import '@init';
import { Application } from 'express';
import { buildApp } from './config/app-setup';
import { startServer } from './config/http-server';

export function run() {
    const app: Application = buildApp();
    return startServer(app).then(server => ({ app, server }));
}

/* istanbul ignore if */
if (!module.parent) {
    run();
}

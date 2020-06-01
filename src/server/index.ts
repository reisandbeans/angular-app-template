import '@init';
import { Application } from 'express';
import { buildApp } from './config/app-setup';
import { startServer } from './config/http-server';

const app: Application = buildApp();

export function run() {
    return startServer(app).then(server => ({ app, server }));
}


/* istanbul ignore next */
declare const __non_webpack_require__: NodeRequire;
const mainModule = __non_webpack_require__ && __non_webpack_require__.main;
const moduleFilename = mainModule && mainModule.filename || '';
if (moduleFilename === __filename) {
    run();
}

import '@init';
import { resolve } from 'path';
import { APP_BASE_HREF } from '@angular/common';
import { ngExpressEngine } from '@nguniversal/express-engine';
import express, { Request, Response } from 'express';
import { AppServerModule } from '@app/app-server-module';

// The Express app is exported so that it can be used by serverless Functions.
export function app() {
    const server = express();
    const distFolder = resolve(__dirname, '../../dist/client');

    if (process.env.USE_SSR) {
        // Our Universal express-engine (found @ https://github.com/angular/universal/tree/master/modules/express-engine)
        server.engine('html', ngExpressEngine({
            bootstrap: AppServerModule,
        }));
    }

    server.set('view engine', 'html');
    server.set('views', distFolder);

    // Example Express Rest API endpoints
    // server.get('/api/**', (req, res) => { });

    // Serve static files from /browser
    server.get('*.*', express.static(distFolder, {
        maxAge: '1y'
    }));

    // All regular routes use the Universal engine
    server.get('*', (req: Request, res: Response) => {
        if (process.env.USE_SSR) {
            res.render('index', { req, providers: [{ provide: APP_BASE_HREF, useValue: req.baseUrl }] });
        } else {
            res.sendFile(`${distFolder}/index.html`);
        }
    });

    return server;
}

function run() {
    const port = process.env.PORT || 4000;

    // Start up the Node server
    const server = app();
    server.listen(port, () => {
        console.log(`Node Express server listening on http://localhost:${port}`);
    });
}

// Webpack will replace 'require' with '__webpack_require__'
// '__non_webpack_require__' is a proxy to Node 'require'
// The below code is to ensure that the server is run only when not requiring the bundle.
declare const __non_webpack_require__: NodeRequire;
const mainModule = __non_webpack_require__.main;
const moduleFilename = mainModule && mainModule.filename || '';
if (moduleFilename === __filename || moduleFilename.includes('iisnode')) {
    run();
}

export * from './app/server-main';

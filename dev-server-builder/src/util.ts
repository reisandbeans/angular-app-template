import { BuilderOutput } from '@angular-devkit/architect';
import { logging } from '@angular-devkit/core';
import * as path from 'path';
import * as rxjs from 'rxjs';
import * as browserSync from 'browser-sync';
import * as url from 'url';
import { delay, ignoreElements, startWith, switchMap, tap } from 'rxjs/operators';
import { getAvailablePort, spawnAsObservable } from '@nguniversal/builders/src/ssr-dev-server/utils';
import { createProxyMiddleware } from 'http-proxy-middleware';
import { Options } from './interfaces';

const IGNORED_STDOUT_MESSAGES = [
    'server listening on',
    'Angular is running in the development mode. Call enableProdMode() to enable the production mode.'
];

export function getClientWorkspaceDetails(options: Options) {
    const { browserWorkspaceRoot } = options;
    if (path.isAbsolute(browserWorkspaceRoot)) {
        return browserWorkspaceRoot;
    }
    return path.resolve(process.cwd(), browserWorkspaceRoot);
}

export function startNodeServer(serverOutput: BuilderOutput, port: number, logger: logging.LoggerApi) {
    const outputPath = serverOutput.outputPath as string;
    const serverPath = path.join(outputPath, 'main.js');
    const env = Object.assign(Object.assign({}, process.env), { PORT: '' + port });
    return rxjs.of(null)
        .pipe(
            delay(0), // Avoid EADDRINUSE error since it will cause the kill event to be finish.
            switchMap(() => spawnAsObservable('node', [`"${serverPath}"`], { env, shell: true })),
            tap(({ stderr, stdout }) => {
                if (stderr) {
                    logger.error(stderr);
                }
                if (stdout && !IGNORED_STDOUT_MESSAGES.some((x: string) => stdout.includes(x))) {
                    logger.info(stdout);
                }
            }),
            ignoreElements(),
            // Emit a signal after the process has been started
            startWith(undefined)
        );
}

export async function initBrowserSync(
    browserSyncInstance: browserSync.BrowserSyncInstance,
    nodeServerPort: number,
    options: Options,
) {
    if (browserSyncInstance.active) {
        return browserSyncInstance;
    }
    const { port: browserSyncPort, open, host, publicHost } = options;
    const bsPort = browserSyncPort || await getAvailablePort();
    const bsOptions: { [key: string]: any } = {
        proxy: {
            target: `localhost:${nodeServerPort}`,
            proxyOptions: {
                xfwd: true
            },
            proxyRes: [
                (proxyRes: any) => {
                    if ('headers' in proxyRes) {
                        proxyRes.headers['cache-control'] = undefined;
                    }
                },
            ]
            // proxyOptions is not in the typings
        },
        host,
        port: bsPort,
        ui: false,
        server: false,
        notify: false,
        ghostMode: false,
        logLevel: 'silent',
        open,
    };
    const publicHostNormalized = publicHost && publicHost.endsWith('/')
        ? publicHost.substring(0, publicHost.length - 1)
        : publicHost;

    if (publicHostNormalized) {
        const { protocol, hostname, port, pathname } = url.parse(publicHostNormalized);
        const defaultSocketIoPath = '/browser-sync/socket.io';
        const defaultNamespace = '/browser-sync';
        const hasPathname = Boolean(pathname && pathname !== '/');
        const namespace = hasPathname ? pathname + defaultNamespace : defaultNamespace;
        const path = hasPathname ? pathname + defaultSocketIoPath : defaultSocketIoPath;
        bsOptions.socket = {
            namespace,
            path,
            domain: url.format({
                protocol,
                hostname,
                port,
            }),
        };
        // When having a pathname we also need to create a reverse proxy because socket.io
        // will be listening on: 'http://localhost:4200/ssr/browser-sync/socket.io'
        // However users will typically have a reverse proxy that will redirect all matching requests
        // ex: http://testinghost.com/ssr -> http://localhost:4200 which will result in a 404.
        if (hasPathname) {
            // Remove leading slash
            bsOptions.scriptPath = (p: string) => p.substring(1);
            bsOptions.middleware = [
                createProxyMiddleware(defaultSocketIoPath, {
                    target: url.format({
                        protocol: 'http',
                        hostname: host,
                        port: bsPort,
                        pathname: path,
                    }),
                    ws: true,
                    logLevel: 'silent',
                }),
            ];
        }
    }
    return new Promise((resolve, reject) => {
        browserSyncInstance.init(bsOptions, (error, bs) => {
            if (error) {
                reject(error);
            }
            else {
                resolve(bs);
            }
        });
    });
}

export function getBaseUrl(bs: browserSync.BrowserSyncInstance) {
    return `${bs.getOption('scheme')}://${bs.getOption('host')}:${bs.getOption('port')}`;
}

export function mapErrorToMessage(error: any) {
    if (error instanceof Error) {
        return error.message;
    }
    if (typeof error === 'string') {
        return error;
    }
    return '';
}

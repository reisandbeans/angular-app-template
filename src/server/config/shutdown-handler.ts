import * as http from 'http';
import gracefulShutdown from 'http-graceful-shutdown';
import { logger } from '@logger';
import { serverConfig } from './server-config';

let execShutdown: () => Promise<void>;

const DEFAULT_DELAY = 5000;

export interface ServerWithShutdownHandler extends http.Server {
    isShuttingDown: boolean;
}

export interface ShutdownHandlerOptions {
    delay?: number;
}

function cleanup(server: ServerWithShutdownHandler, delay: number = DEFAULT_DELAY): Promise<void> {
    logger.error(`Shutting down server in ${Math.floor(delay / 1000)} seconds...`);
    // Flag set here as well in case the handler was activated by a SIGTERM or SIGINT
    server.isShuttingDown = true;
    return new Promise((resolve) => {
        setTimeout(resolve, delay);
    });
}

function handleError(server: ServerWithShutdownHandler, error: any) {
    logger.error('Uncaught exception in server').error(error);
    // Flag set here to prevent successive uncaught exceptions to trigger the shutdown again
    if (!server.isShuttingDown) {
        server.isShuttingDown = true;
        execShutdown();
    }
}

export function registerShutdownHandler(
    server: ServerWithShutdownHandler,
    opts: ShutdownHandlerOptions = {},
) {
    logger.info('Registering shutdown handler...');

    execShutdown = gracefulShutdown(server, {
        signals: 'SIGINT SIGTERM',
        timeout: 30000,
        development: !serverConfig.isProduction,
        onShutdown: () => cleanup(server, opts.delay),
        finally: () => {
            logger.info('Server gracefully closed');
        },
    });

    process.on('uncaughtException', handleError.bind(null, server));
}

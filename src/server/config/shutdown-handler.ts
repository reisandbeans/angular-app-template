import gracefulShutdown from 'http-graceful-shutdown';
import { logger } from '@logger';

const isProduction = process.env.NODE_ENV === 'production';

let execShutdown: () => Promise<void>;

function cleanup(server: any): Promise<void> {
    server.isShuttingDown = true;

    return new Promise((resolve) => {
        logger.info('Cleaning up resources... ');
        setTimeout(resolve, 5000);
    });
}

function handleError(server: any, error: any) {
    logger.error('Uncaught exception in server', error);
    server.isShuttingDown = true;
    execShutdown();
}

export function registerShutdownHandler(server: any) {
    execShutdown = gracefulShutdown(server, {
        signals: 'SIGINT SIGTERM',
        timeout: 30000,
        development: !isProduction,
        onShutdown: () => cleanup(server),
        finally: () => {
            logger.info('Server gracefully ended');
        },
    });

    process.on('uncaughtException', handleError.bind(null, server));
}

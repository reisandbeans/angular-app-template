import http from 'http';
import { Application } from 'express';
import { logger } from '@logger';
import { serverConfig } from './server-config';
import { registerShutdownHandler, ServerWithShutdownHandler } from './shutdown-handler';

export function startServer(app: Application): Promise<http.Server> {
    const server = http.createServer(app);
    const { port, useShutdownHandler } = serverConfig;

    return new Promise((resolve) => {
        server.listen(port, () => {
            if (useShutdownHandler) {
                registerShutdownHandler(server as ServerWithShutdownHandler);
            }
            logger.info(`Server listening on port ${port}...`);
            resolve(server);
        });
    });
}

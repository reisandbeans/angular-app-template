import http from 'http';
import { Application } from 'express';
import { logger } from '@logger';
import { registerShutdownHandler } from './shutdown-handler';

export function startServer(app: Application) {
    const server = http.createServer(app);
    const { port } = serverConfig;

    return new Promise((resolve) => {
        server.listen(port, () => {
            logger.info(`Server listening on port ${port}...`);
            registerShutdownHandler(server);
            resolve(server);
        });
    });
}

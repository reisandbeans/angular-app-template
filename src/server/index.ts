import '@init';
import { Application } from 'express';
import { logger } from '@logger';
import { buildApp } from './config/app-setup';
import { startServer } from './config/http-server';

const app: Application = buildApp();

export function run() {
    return startServer(app)
        .then(() => app)
        .catch((error: any) => {
            logger.error('Error while bootstrapping application', error);
            throw error;
        });
}

if (require.main === module) {
    run();
}

import '@init';
import { logger } from '@logger';
import { buildApp } from './config/app-setup';
import { startServer } from './config/http-server';

const app = buildApp();

startServer(app)
    .then(() => {})
    .catch((error: any) => {
        logger.error('Error while bootstrapping application', error);
        throw error;
    });

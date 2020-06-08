import { Router } from 'express';
import { mount as mountRoutes } from './routes';

export function mount(router: Router) {
    const apiRouter = Router();
    mountRoutes(apiRouter);
    router.use('/v1', apiRouter);
}

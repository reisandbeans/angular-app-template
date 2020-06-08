import { Router, Response, Request } from 'express';
import { mount as mountHealthCheck } from './health-check';
import { mount as mountApiV1 } from './v1';
import { entityNotFound } from '@server/lib/exceptions/application-exceptions';
import { errorHandler } from '@server/api/lib/middleware/error-handler';

export function mount(router: Router) {
    mountHealthCheck(router);
    mountApiV1(router);

    router.all('*', (req: Request, res: Response) => {
        throw entityNotFound(`URL ${req.url} does not exist`);
    });

    router.use(errorHandler);
}

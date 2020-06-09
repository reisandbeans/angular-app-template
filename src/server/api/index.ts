import { Router, Response, Request } from 'express';
import { mount as mountHealthCheck } from './health-check';
import { mount as mountApiV1 } from './v1';
import { NotFoundError } from '@server/lib/exceptions';
import { errorHandler } from '@server/api/lib/middleware/error-handler';

export function mount(router: Router) {
    mountHealthCheck(router);
    mountApiV1(router);

    router.all('*', (req: Request, res: Response) => {
        throw new NotFoundError(`URL ${req.url} does not exist`);
    });

    router.use(errorHandler);
}

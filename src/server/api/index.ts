import { Router, Response, Request } from 'express';
import { ApiResponse } from '@server/api/lib/api-responses/api-response';
import { mount as mountHealthCheck } from './health-check';
import { mount as mountApiV1 } from './v1';

export function mount(router: Router) {
    mountHealthCheck(router);
    mountApiV1(router);

    router.all('*', (req: Request, res: Response) => {
        ApiResponse.NotFound().send(res);
    });
}

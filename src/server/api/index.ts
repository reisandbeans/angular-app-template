import { Router, Response, Request } from 'express';
import { mount as mountHealthCheck } from './health-check';
import { mount as mountApiV1 } from './v1';

export function mount(router: Router) {
    mountHealthCheck(router);
    mountApiV1(router);

    router.all('*', (req: Request, res: Response) => {
        res.status(404).json({ success: false });
    });
}

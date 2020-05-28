import { Router, Response, Request } from 'express';

export function mount(router: Router) {
    router.all('*', (req: Request, res: Response) => {
        res.status(404).json({ success: false });
    });
}

import { Router } from 'express';
import helloWorldRouter from './resources/hello-world/hello-world-router';

export function mount(router: Router) {
    router.use('/hello-world', helloWorldRouter);
}

import Router from 'express-promise-router';
import { schemas } from './hello-world-schemas';
import { helloWorld } from './hello-world-controller';
import { createValidator } from '@server/api/lib/middleware/validator-factory';

const validator = createValidator(schemas);
const router = Router();

router.post('/', validator('postHelloWorld'), helloWorld);

export default router;

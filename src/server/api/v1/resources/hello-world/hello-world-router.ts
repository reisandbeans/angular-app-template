import Router from 'express-promise-router';
import {  createValidator } from 'express-ajv';
import { schemas } from './hello-world-schemas';
import { helloWorld } from './hello-world-controller';

const validator = createValidator(schemas);
const router = Router();

router.post('/', validator('postHelloWorld'), helloWorld);

export default router;

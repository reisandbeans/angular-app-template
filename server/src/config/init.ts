import 'zone.js/dist/zone-node';
import { resolve } from 'path';
import * as appRoot from 'app-root-path';
import * as dotenv from 'dotenv';
import { registerProvider } from '@app/client-provider';
import * as provider from '@client/src/client-provider';

dotenv.config({ path: resolve(appRoot.path, '.env') });

console.log('<<<<< ROOT', appRoot.path, '>>>>>');

const resolvedPath = require.resolve('../../../client/src/client-provider');
// const resolvedPath = resolve(__dirname, '../../client/src/client-provider');

console.log('ENV\n\n', JSON.stringify(process.env.USE_SSR));

registerProvider(resolvedPath, provider);

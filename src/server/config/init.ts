import 'zone.js/dist/zone-node';
import { resolve } from 'path';
import * as appRoot from 'app-root-path';
import * as dotenv from 'dotenv';

dotenv.config({ path: resolve(appRoot.path, '.env') });

console.log('<<<<< ROOT', appRoot.path, '>>>>>');

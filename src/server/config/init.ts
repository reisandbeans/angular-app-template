import 'zone.js/dist/zone-node';
import { resolve } from 'path';
import * as dotenv from 'dotenv';

const path = resolve(process.cwd(), '.env');
dotenv.config({ path });

console.log('<<<<< USE_SSR', process.env.USE_SSR, '>>>>>');

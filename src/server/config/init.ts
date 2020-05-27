import 'zone.js/dist/zone-node';
import { resolve } from 'path';
import { config as configEnv } from 'dotenv-safe';

const example = resolve(process.cwd(), '.env.example');
configEnv({ example });

console.log('<<<<< USE_SSR', process.env.USE_SSR, '>>>>>');

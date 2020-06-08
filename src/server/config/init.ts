import { config as configEnv } from 'dotenv';

configEnv();

import { serverConfig } from '@server/config/server-config';

/* istanbul ignore next */
if (serverConfig.useSsr) {
    require('zone.js/dist/zone-node');
    require('../server-side-rendering/server-main');
}

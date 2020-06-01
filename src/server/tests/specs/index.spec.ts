import axios from 'axios';
import { serverConfig } from '@server/config/server-config';
import { run } from '@server/index';

describe('index.spec.ts', () => {

    it('Should start the server and listen on the default port', async () => {
        const { server } = await run();

        const apiResponse = await axios.get(`http://localhost:${serverConfig.port}/api/health-check`);
        expect(apiResponse.status).toBe(200);

        server.close();
    });
});

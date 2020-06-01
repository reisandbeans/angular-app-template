import axios from 'axios';
import http from 'http';
import request from 'supertest';
import { buildApp } from '@server/config/app-setup';

describe('health-check.spec.ts', () => {
    const app = buildApp();

    it('Should return a 200 response', async () => {
        const response = await request(app).get('/api/health-check');
        expect(response.status).toBe(200);
    });

    it('Should return a 500 response if the server is shutting down', async () => {
        expect.assertions(1);

        const server = http.createServer(app) as any;
        server.isShuttingDown = true;

        const port = await new Promise((resolve) => {
            server.listen(() => resolve(server.address().port));
        });
        try {
            await axios.get(`http://localhost:${port}/api/health-check`);
        } catch (error) {
            expect(error.response.status).toBe(500);
        } finally {
            server.close();
        }
    });
});

import request from 'supertest';
import { buildApp } from '@server/config/app-setup';

describe('health-check.spec.ts', () => {
    const app = buildApp();

    it('Should return a 200 response', async () => {
        const response = await request(app).get('/api/health-check');
        expect(response.status).toBe(200);
    });

    it('Should return a 500 response if the server is shutting down', () => {

    });
});

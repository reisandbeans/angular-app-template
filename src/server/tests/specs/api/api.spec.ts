import request from 'supertest';
import { buildApp } from '@server/config/app-setup';
import { testError } from '@test-lib/util';

describe('api.spec.ts', () => {
    const app = buildApp();

    it('Should return a 404 error if the request resource is not found', async () => {
        const response = await request(app).get('/api/v1/some-random-endpoint');
        expect(response.status).toBe(404);
        testError(response.body.error);
    });
});

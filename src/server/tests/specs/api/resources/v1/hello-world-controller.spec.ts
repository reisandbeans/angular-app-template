import request from 'supertest';
import { Application } from 'express';
import { testError } from '@test-lib/util';
import { buildApp } from '@server/config/app-setup';

describe('hello-world-controller.spec.ts', () => {
    const app: Application = buildApp();

    describe('[POST] /api/v1/hello-world', () => {
        function sendRequest(data: object = {}) {
            const url = '/api/v1/hello-world';
            return request(app)
                .post(url)
                .send(data);
        }

        it('Should return a 400 error if the required parameters are not provided', async () => {
            const response = await sendRequest({});
            expect(response.status).toBe(400);
            testError(response.body.error);
        });

        it('Should return a 400 error if the parameter is not a string', async () => {
            const response = await sendRequest({ sender: '' });
            expect(response.status).toBe(400);
            testError(response.body.error);
        });

        it('Should return a 200 response', async () => {
            const response = await sendRequest({ sender: 'foo' });
            expect(response.status).toBe(200);
            expect(response.body).toMatchSnapshot();
        });
    });
});

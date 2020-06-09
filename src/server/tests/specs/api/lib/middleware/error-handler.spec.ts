import Ajv from 'ajv';
import { errorHandler } from '@server/api/lib/middleware/error-handler';
import { NotFoundError } from '@server/lib/exceptions';
import { testError } from '@test-lib/util';

describe('error-handler.spec.ts', () => {
    let mockResponse: any;

    beforeEach(() => {
        mockResponse = {
            status: jest.fn().mockImplementation(function() {
                return this;
            }),
            json: jest.fn(),
        };
    });

    function assertError(expectedStatus: number) {
        expect(mockResponse.status).toHaveBeenCalledWith(expectedStatus);
        expect(mockResponse.json).toHaveBeenCalledTimes(1);
        const { error } = mockResponse.json.mock.calls[0][0];
        testError(error);
    }

    it('Should handle application errors', () => {
        const applicationError = new NotFoundError('Entity 1234 was not found');
        errorHandler(applicationError, {} as any, mockResponse, () => {});
        assertError(404);
    });

    it('Should handle ajv-errors instances and return the appropriate mapped error', () => {
        const ajv = new Ajv({ allErrors: true, format: 'full' });
        const schema = {
            type: 'object',
            properties: {
                name: {
                    type: 'string',
                    minLength: 3,
                },
                age: {
                    type: 'number',
                    minimum: 1,
                },
                city: {
                    type: 'string',
                },
            },
            required: ['name', 'age', 'city'],
        };
        ajv.validate(schema, { name: 'a', age: 0 });
        const error = new Ajv.ValidationError(ajv.errors);
        errorHandler(error, {} as any, mockResponse, () => {});
        assertError(400);
    });

    it('Should handle generic errors and return the appropriate mapped error', () => {
        const error = new Error('Some random error');
        errorHandler(error, {} as any, mockResponse, () => {});
        assertError(500);
    });
});

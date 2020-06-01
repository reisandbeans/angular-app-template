import Ajv from 'ajv';
import { errorHandler } from '@server/api/lib/middleware/error-handler';
import { ApiResponse } from '@server/api/lib/api-responses/api-response';

describe('error-handler.spec.ts', () => {
    let mockResponse: any;

    beforeEach(() => {
        mockResponse = {
            status: jest.fn().mockImplementation(function() {
                return this;
            }),
            json: jest.fn()
        };
    });

    function assertError(expectedStatus: number) {
        expect(mockResponse.status).toHaveBeenCalledWith(expectedStatus);
        expect(mockResponse.json).toHaveBeenCalledTimes(1);
        const response = mockResponse.json.mock.calls[0][0];
        expect(response).toMatchSnapshot();
    }

    it('Should handle api-responses instances as errors', () => {
        const apiResponse = ApiResponse.NotFound('Entity 1234 was not found');
        errorHandler(apiResponse, {} as any, mockResponse, () => {});
        expect(mockResponse.status).toHaveBeenCalledWith(apiResponse.status);
        expect(mockResponse.json).toHaveBeenCalledWith(apiResponse.toJson());
    });

    it('Should handle ajv-errors instances and return the appropriate mapped error', () => {
        const ajv = new Ajv({ allErrors: true, format: 'full' });
        const schema = {
            type: 'object',
            properties: {
                name: {
                    type: 'string',
                    minLength: 3
                },
                age: {
                    type: 'number',
                    minimum: 1
                },
                city: {
                    type: 'string'
                }
            },
            required: ['name', 'age', 'city']
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

import { ApiResponse } from '@server/api/lib/api-responses/api-response';

describe('api-response.spec.ts', () => {
    function testApiResponse(response: ApiResponse) {
        const result = response.toJson();
        expect(result).toMatchSnapshot();
    }
    it('Should create a 200 success response', () => {
        const response = ApiResponse.Ok();
        testApiResponse(response);
    });

    it('Should create a 200 success response with the provided data', () => {
        const response = ApiResponse.Ok({ foo: 'bar' });
        testApiResponse(response);
    });

    it('Should create a 201 created response', () => {
        const response = ApiResponse.Created();
        testApiResponse(response);
    });

    it('Should create a 201 created response with the provided data', () => {
        const response = ApiResponse.Created({ foo: 'bar' });
        testApiResponse(response);
    });

    it('Should create a 204 no-content response', () => {
        const response = ApiResponse.NoContent();
        testApiResponse(response);
    });

    it('Should create a 429 too many requests response', () => {
        const response = ApiResponse.TooManyRequests();
        testApiResponse(response);
    });
});

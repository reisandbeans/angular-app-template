import { serverConfig } from '@server/config/server-config';
import { ErrorCode } from '@server/lib/exceptions/error-code';
import { ApplicationError, ErrorDetail } from '@server/lib/exceptions/application-error';

jest.mock('@server/config/server-config');

describe('application-error.spec.ts', () => {
    it('Should build an instance of api error with the expected properties', () => {
        const errorCode = ErrorCode.InvalidParameters;
        const message = 'Invalid Parameters provided';

        const error = new ApplicationError(errorCode, message);

        expect(error.message).toBe(message);
        expect(error.code).toBe(errorCode);
        expect(error).toBeInstanceOf(Error);
    });

    function buildMockError() {
        const errors: ErrorDetail[] = [
            {
                field: 'name',
                code: ErrorCode.InvalidParameters,
                message: 'Invalid name provided',
            },
        ];
        return new ApplicationError(
            ErrorCode.InvalidParameters,
            'Invalid Parameters provided',
            errors,
        );
    }

    it('Should build an instance of api error with the provided error details', () => {
        const error = buildMockError();
        expect(error.errors).toEqual([
            {
                field: 'name',
                code: ErrorCode.InvalidParameters,
                message: 'Invalid name provided',
            },
        ]);
    });

    it('Should serialize the error instance to a JSON object', () => {
        const error = buildMockError();

        (serverConfig as any).isProduction = true;
        const result = error.toJson();

        expect(result).not.toHaveProperty('stack');
        expect(result).toEqual({
            code: error.code,
            message: error.message,
            errors: error.errors,
        });
    });

    it('Should include the error stack trace if not running in prod mode', () => {
        const error = buildMockError();

        (serverConfig as any).isProduction = false;
        const result = error.toJson();

        expect(result).toHaveProperty('stack');
    });
});

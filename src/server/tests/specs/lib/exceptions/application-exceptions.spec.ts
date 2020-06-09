import {
    ApplicationError, ErrorCode,
    ErrorDetail, InsufficientPrivilegesError,
    InvalidParametersError, NotFoundError, UnauthorizedError, UnexpectedError,
} from '@server/lib/exceptions';
import { serverConfig } from '@server/config/server-config';

jest.mock('@server/config/server-config');

describe('application-exceptions.spec.ts', () => {
    beforeAll(() => {
        // to omit error stack traces from snapshot
        (serverConfig as any).isProduction = true;
    });

    function testError(error: ApplicationError) {
        const errorObject = error.toJson();
        expect(errorObject).toMatchSnapshot();
    }

    describe('#InvalidParametersError', () => {
        it('Should create an InvalidParametersError with the provided error detail', () => {
            const errorDetail = {
                code: ErrorCode.MissingRequiredParameter,
                message: 'Parameter name is required',
                field: 'name',
            } as ErrorDetail;
            const error = new InvalidParametersError(errorDetail);
            testError(error);
        });

        it('Should create an InvalidParametersError with the provided error details', () => {
            const errorDetails = [
                {
                    code: ErrorCode.MissingRequiredParameter,
                    message: 'Parameter firstName is required',
                    field: 'firstName',
                },
                {
                    code: ErrorCode.MissingRequiredParameter,
                    message: 'Parameter lastName is required',
                    field: 'lastName',
                },
            ] as ErrorDetail[];
            const error = new InvalidParametersError(errorDetails);
            testError(error);
        });

        it('Should create an InvalidParametersError with the provided error message', () => {
            const error = new InvalidParametersError([], 'Lorem ipsum si amet');
            testError(error);
        });

        it('Should return the expected http error code', () => {
            const error = new InvalidParametersError([], 'Lorem ipsum si amet');
            const code = error.getHttpStatusCode();
            expect(code).toBe(400);
        });
    });

    describe('#NotFoundError', () => {
        it('Should create a NotFoundError with default properties', () => {
            const error = new NotFoundError();
            testError(error);
        });

        it('Should create a NotFoundError with the provided error message', () => {
            const error = new NotFoundError('Lorem ipsum sit amet');
            testError(error);
        });

        it('Should return the expected http error code', () => {
            const error = new NotFoundError();
            const code = error.getHttpStatusCode();
            expect(code).toBe(404);
        });
    });

    describe('#UnauthorizedError', () => {
        it('Should create an UnauthorizedError with default properties', () => {
            const error = new UnauthorizedError();
            testError(error);
        });

        it('Should create an UnauthorizedError with the provided error message', () => {
            const error = new UnauthorizedError('Lorem ipsum sit amet');
            testError(error);
        });

        it('Should return the expected http error code', () => {
            const error = new UnauthorizedError();
            const code = error.getHttpStatusCode();
            expect(code).toBe(401);
        });
    });

    describe('#InsufficientPrivilegesError', () => {
        it('Should create an InsufficientPrivilegesError with default properties', () => {
            const error = new InsufficientPrivilegesError();
            testError(error);
        });

        it('Should create an InsufficientPrivilegesError with the provided error message', () => {
            const error = new InsufficientPrivilegesError('Lorem ipsum sit amet');
            testError(error);
        });

        it('Should return the expected http error code', () => {
            const error = new InsufficientPrivilegesError();
            const code = error.getHttpStatusCode();
            expect(code).toBe(403);
        });
    });

    describe('#UnexpectedError', () => {
        it('Should create an UnexpectedError from the provided error', () => {
            const error = new Error('Lorem ipsum sit amet');
            const unexpectedError = new UnexpectedError(error);
            testError(unexpectedError);
        });

        it('Should return the expected http error code', () => {
            const error = new Error('Lorem ipsum sit amet');
            const unexpectedError = new UnexpectedError(error);
            const code = unexpectedError.getHttpStatusCode();
            expect(code).toBe(500);
        });
    });
});

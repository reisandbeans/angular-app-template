import { ErrorCode } from '@server/lib/exceptions/error-code';

const map: { [key in ErrorCode]: number } = {
    [ErrorCode.EntityNotFound]: 404,
    [ErrorCode.Forbidden]: 403,
    [ErrorCode.InvalidParameters]: 400,
    [ErrorCode.MissingRequiredParameter]: 400,
    [ErrorCode.Unauthorized]: 401,
    [ErrorCode.UnexpectedError]: 500,
};

export function getStatusForErrorCode(errorCode: ErrorCode) {
    return map[errorCode] || 500;
}

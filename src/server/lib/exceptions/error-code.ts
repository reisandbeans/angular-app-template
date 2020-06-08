export enum ErrorCode {
    EntityNotFound = 'entityNotFound',
    Forbidden = 'accessDenied',
    InvalidParameters = 'invalidParameters',
    MissingRequiredParameter = 'missingRequiredParameter',
    Unauthorized = 'authenticationRequired',
    UnexpectedError = 'unexpectedError',
}

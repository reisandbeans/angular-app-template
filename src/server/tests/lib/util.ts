import { pick } from 'lodash';

export function cleanError(error: any) {
    return pick(error, ['code', 'message', 'errors']);
}

export function testError(error: any) {
    const errorObject = cleanError(error);
    expect(errorObject).toMatchSnapshot();
}

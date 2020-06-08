import { ngExpressEngine } from '@nguniversal/express-engine';
import { serverConfig } from '@server/config/server-config';
import { RootServerModule } from '@server/server-side-rendering/root-server-module';
import { buildApp } from '@server/config/app-setup';

jest.mock('@nguniversal/express-engine');
jest.mock('@server/config/server-config', () => ({
    serverConfig: {
        distFolderPath: 'dist/app',
        useSsr: true,
    },
}));

describe('app-setup.spec.ts', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        (ngExpressEngine as jest.Mock).mockImplementation(() => () => {});
    });

    it('Should use the angular universal engine as the html engine if using server side rendering', () => {
        (serverConfig as any).useSsr = true;
        buildApp();
        expect(ngExpressEngine).toHaveBeenCalledTimes(1);
        expect(ngExpressEngine).toHaveBeenCalledWith({ bootstrap: RootServerModule });
    });

    it('Should not use the angular universal engine as the html engine if not using server side rendering', () => {
        (serverConfig as any).useSsr = false;
        buildApp();
        expect(ngExpressEngine).not.toHaveBeenCalled();
    });
});

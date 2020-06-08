import http from 'http';
import { serverConfig } from '@server/config/server-config';
import { startServer } from '@server/config/http-server';
import { registerShutdownHandler } from '@server/config/shutdown-handler';

jest.mock('http');
jest.mock('@server/config/shutdown-handler', () => {
    return {
        registerShutdownHandler: jest.fn(),
    };
});
jest.mock('@server/config/server-config', () => ({
    serverConfig: {
        distFolderPath: 'dist/app',
        port: 4000,
        useShutdownHandler: false,
    },
}));

describe('http-server.spec.ts', () => {
    let server: {
        listen: jest.Mock;
        on: jest.Mock;
    };
    const app: any = { foo: 'bar' };

    beforeEach(() => {
        jest.resetAllMocks();
        (http.createServer as jest.Mock).mockImplementation(() => {
            server = {
                listen: jest.fn().mockImplementation((port, callback) => {
                    callback();
                }),
                on: jest.fn(),
            };
            return server;
        });
    });

    it('Should start a http server in the specified port', async () => {
        await startServer(app);
        expect(http.createServer).toHaveBeenCalledWith(app);
        expect(server.listen).toHaveBeenCalledWith(serverConfig.port, expect.any(Function));
        expect(registerShutdownHandler).not.toHaveBeenCalled();
    });

    it('Should register the shutdown handler if the flag is enabled in the server config', async () => {
        (serverConfig as any).useShutdownHandler = true;
        await startServer(app);
        expect(registerShutdownHandler).toHaveBeenCalledWith(server);
    });
});

import { run } from '@server/index';
import { buildApp } from '@server/config/app-setup';
import { startServer } from '@server/config/http-server';

jest.mock('@server/config/http-server');
jest.mock('@server/config/app-setup');

describe('index.spec.ts', () => {
    it('Should start the server and listen on the default port', async () => {
        const mockApp = { foo: 'bar' };
        const mockServer = { baz: 'foo'};

        (buildApp as jest.Mock).mockReturnValue(mockApp);
        (startServer as jest.Mock).mockResolvedValue(mockServer);

        const { server, app } = await run();

        expect(server).toBe(mockServer);
        expect(app).toBe(mockApp);
        expect(startServer).toHaveBeenCalledWith(mockApp);
    });
});

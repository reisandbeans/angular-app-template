import { getRenderer } from '@server/config/renderers';
import { serverConfig } from '@server/config/server-config';
import { APP_BASE_HREF } from '@angular/common';

jest.mock('@server/config/server-config', () => ({
    serverConfig: {
        distFolderPath: 'dist/app',
        useSsr: true,
    },
}));

describe('renderers.spec.ts', () => {
    let mockRequest: any;
    let mockResponse: any;

    beforeEach(() => {
        mockRequest = {
            baseUrl: 'http://localhost:4000',
        };
        mockResponse = {
            render: jest.fn(),
            sendFile: jest.fn(),
        };
    });

    it('Should return the basic html render function if ssr is disabled', () => {
        (serverConfig as any).useSsr = false;
        const render = getRenderer();
        render(mockRequest, mockResponse, null);

        expect(mockResponse.sendFile).toHaveBeenCalledWith(
            `${serverConfig.distFolderPath}/index.html`,
        );
        expect(mockResponse.render).not.toHaveBeenCalled();
    });

    it('Should return the render function to use for ssr', () => {
        (serverConfig as any).useSsr = true;
        const render = getRenderer();
        render(mockRequest, mockResponse, null);

        expect(mockResponse.render).toHaveBeenCalledWith('index', {
            req: mockRequest,
            providers: [
                {
                    provide: APP_BASE_HREF,
                    useValue: mockRequest.baseUrl,
                },
            ],
        });
        expect(mockResponse.sendFile).not.toHaveBeenCalled();
    });
});

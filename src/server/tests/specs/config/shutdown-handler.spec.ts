import gracefulShutdown from 'http-graceful-shutdown';
import { registerShutdownHandler } from '@server/config/shutdown-handler';

jest.mock('http-graceful-shutdown');

describe('shutdown-handler.spec', () => {
    let execShutdownStub: jest.Mock;
    let mockServer: any;

    (jest as any).useFakeTimers('modern');

    beforeEach(() => {
        jest.clearAllMocks();
        mockServer = {
            isShuttingDown: false,
        };
        (gracefulShutdown as jest.Mock).mockImplementation((server: any, opts: any) => {
            execShutdownStub = jest.fn().mockImplementation(() => {
                return opts.onShutdown().then(() => opts.finally());
            });
            return execShutdownStub;
        });
    });

    it('Should register the shutdown handler for uncaught exceptions', () => {
        registerShutdownHandler(mockServer, { delay: 1000 });

        process.emit('uncaughtException', new Error('Unexpected error'));

        jest.advanceTimersByTime(1100);
        const expectedOptions = {
            signals: 'SIGINT SIGTERM',
            timeout: 30000,
            development: true,
            onShutdown: expect.any(Function),
            finally: expect.any(Function),
        };
        expect(mockServer.isShuttingDown).toBe(true);
        expect(gracefulShutdown).toHaveBeenCalledWith(mockServer, expectedOptions);
        expect(execShutdownStub).toHaveBeenCalled();
    });

    it('Should not trigger the shutdown if it is already happening', () => {
        registerShutdownHandler(mockServer, { delay: 1000 });

        process.emit('uncaughtException', new Error('Unexpected error'));
        process.emit('uncaughtException', new Error('Unexpected error'));

        jest.advanceTimersByTime(1100);

        expect(gracefulShutdown).toHaveBeenCalledTimes(1);
        expect(execShutdownStub).toHaveBeenCalledTimes(1);
    });

    it('Should use the default shutdown handler options', () => {
        registerShutdownHandler(mockServer);

        process.emit('uncaughtException', new Error('Unexpected error'));

        jest.advanceTimersByTime(5100);

        expect(gracefulShutdown).toHaveBeenCalledTimes(1);
        expect(execShutdownStub).toHaveBeenCalledTimes(1);
        expect(mockServer.isShuttingDown).toBe(true);
    });
});

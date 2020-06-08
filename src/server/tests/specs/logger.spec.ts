import * as stream from 'stream';
import { transports, Logger } from 'winston';

jest.mock('winston', () => jest.requireActual('winston'));

describe('logger.spec.ts', () => {
    // @types/jest is still in version 25 and doesn't know about the new timer implementation
    const now = 1591489733594;
    (jest as any).useFakeTimers('modern');
    (jest as any).setSystemTime(now);

    class TestStream extends stream.Writable {
        public result = '';

        _write(chunk: any, enc: string, next: (err?: Error) => void) {
            this.result = this.result + chunk.toString();
            next();
        }
    }

    function testLog(getLogger: () => Logger, log: (logger: Logger) => void) {
        return new Promise((resolve) => {
            jest.isolateModules(() => {
                const logger = getLogger();
                const testStream = new TestStream();
                logger.clear().add(new transports.Stream({ stream: testStream }));

                testStream.on('finish', () => {
                    resolve(testStream.result);
                });
                log(logger);
                testStream.end();
            });
        });
    }

    it('Should log the message in the expected format', async () => {
        const getLogger = () => {
            const { logger } = require('@logger');
            return logger;
        };
        const message = await testLog(getLogger, (logger: Logger) => logger.info('Lorem ipsum'));
        expect(message).toMatchSnapshot();
    });

    it('Should create a child logger with the provided prefix', async () => {
        const getLogger = () => {
            const { createPrefixedLogger, logger } = require('@logger');
            // Removing parent transports
            logger.clear();
            return createPrefixedLogger('[UnitTest]');
        };
        const message = await testLog(getLogger, (logger: Logger) => logger.info('Lorem ipsum'));
        expect(message).toMatchSnapshot();
    });

    it('Should correctly log an error', async () => {
        const getLogger = () => {
            const { logger } = require('@logger');
            return logger;
        };
        const message = await testLog(getLogger, (logger: Logger) => logger.error(new Error('Unexpected error')));
        expect(message).toContain('Unexpected error');
    });
});

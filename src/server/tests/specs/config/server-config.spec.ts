import { concat } from 'lodash';
import { ServerConfig } from '@server/config/server-config';

jest.mock('yargs', () => {
    const actualImplementation = jest.requireActual('yargs');
    return {
        parse: () => {
            return actualImplementation.parse(process.argv.splice(2));
        }
    };
});

describe('server-config.spec.ts', () => {
    const envBackup = process.env;
    const argvBackup = process.argv;

    beforeEach(() => {
        jest.resetModules();
        process.argv = [...argvBackup];
        process.env = { ...envBackup };
    });

    afterAll(() => {
        process.argv = argvBackup;
        process.env = envBackup;
    });

    it('Should set isProduction to true if NODE_ENV is set to production', () => {
        process.env.NODE_ENV = 'production';
        const config = new ServerConfig();
        expect(config.isProduction).toBe(true);
    });

    it('Should set isProduction to false if NODE_ENV is set to something else', () => {
        process.env.NODE_ENV = 'dev';
        const config = new ServerConfig();
        expect(config.isProduction).toBe(false);
    });

    it('Should use configs from env vars', () => {
        process.env.PORT = '8181';
        process.env.USE_SSR = 'false';
        process.env.USE_SHUTDOWN_HANDLER = 'true';

        const config = new ServerConfig();

        expect(config.port).toBe(8181);
        expect(config.useShutdownHandler).toBe(true);
        expect(config.useSsr).toBe(false);
    });

    it('Should use configs from argv', () => {
        process.argv = concat(process.argv, [
            '--port',
            '8282',
            '--useShutdownHandler',
            'true'
        ]);

        const config = new ServerConfig();

        expect(config.port).toBe(8282);
        expect(config.useShutdownHandler).toBe(true);
    });

    it('Should use default configs if nothing is provided', () => {
        const config = new ServerConfig();

        expect(config.port).toBe(8080);
        expect(config.useShutdownHandler).toBe(false);
        expect(config.useSsr).toBe(true);
    });

    it('Should merge configs from env and argv', () => {
        process.env.PORT = '8181';
        process.env.USE_SSR = 'false';
        process.env.USE_SHUTDOWN_HANDLER = 'true';

        process.argv = concat(process.argv, [
            '--port',
            '8282',
        ]);

        const config = new ServerConfig();

        expect(config.port).toBe(8282);
        expect(config.useShutdownHandler).toBe(true);
        expect(config.useSsr).toBe(false);
    });

    it('Should throw an error if invalid env vars are provided', () => {
        process.env.PORT = 'not-a-number';
        process.env.USE_SSR = 'not-a-boolean';
        process.env.USE_SHUTDOWN_HANDLER = 'not-a-boolean';

        const run = () => new ServerConfig();

        expect(run).toThrowErrorMatchingSnapshot();
    });

    it('Should throw an error if invalid arg vars are provided', () => {
        process.argv = concat(process.argv, [
            '--port',
            'not-a-number',
            '--useSsr',
            'not-a-boolean',
            '--useShutdownHandler',
            'not-a-boolean'
        ]);

        const run = () => new ServerConfig();

        expect(run).toThrowErrorMatchingSnapshot();
    });
});
